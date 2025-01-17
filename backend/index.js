const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const productCollection = client.db("wda-products-filter").collection("products");

    app.get("/products", async (req, res) => {
      try {
        const { search = "", category = "", sort = "", page = 1 } = req.query;
        const limit = 8;
        const skip = (page - 1) * limit;

        const filter = {};
        if (search) filter.name = { $regex: search, $options: "i" };
        if (category) filter.category = category;

        const sortOption = {};
        if (sort === "rating") sortOption.rating = -1;
        else if (sort === "priceLowToHigh") sortOption.price = 1;
        else if (sort === "priceHighToLow") sortOption.price = -1;

        const totalProducts = await productCollection.countDocuments(filter);
        const products = await productCollection
          .find(filter)
          .sort(sortOption)
          .skip(skip)
          .limit(limit)
          .toArray();

        res.json({ totalProducts, products });
      } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("WDA Products Filter server is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
