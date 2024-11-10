const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const productCollection = client.db("wda-products-filter").collection("products");

    app.get("/products", async (req, res) => {
      const { search = "", category = "", sort = "", page = 1 } = req.query;
      const limit = 8;
      const skip = (page - 1) * limit;

      const filter = {};
      if (search) {
        filter.name = { $regex: search, $options: "i" };
      }
      if (category) {
        filter.category = category;
      }

      const sortOption = {};
      if (sort === "rating") {
        sortOption.rating = -1;
      } else if (sort === "priceLowToHigh") {
        sortOption.price = 1;
      } else if (sort === "priceHighToLow") {
        sortOption.price = -1;
      }

      const totalProducts = await productCollection.countDocuments(filter);

      const products = await productCollection
        .find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .toArray();
      res.json({ totalProducts, products });
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("WDA Products Filter server is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
