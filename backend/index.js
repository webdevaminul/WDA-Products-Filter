const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Import dotenv to load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Enabling CORS for all routes
app.use(express.json()); // Parsing JSON request from body

const { MongoClient, ServerApiVersion } = require("mongodb");

// Creating a MongoClient instance with options to use MongoDB Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Accessing the "products" collection in the "wda-products-filter" database
    const productCollection = client.db("wda-products-filter").collection("products");

    // Route to retrieve products based on filters, sorting, and pagination
    app.get("/products", async (req, res) => {
      const { search = "", category = "", sort = "", page = 1 } = req.query; // Getting query parameters
      const limit = 8; // Number of products per page
      const skip = (page - 1) * limit; // Calculating how many documents to skip

      // Setting up filter criteria based on search and category
      const filter = {};
      if (search) {
        filter.name = { $regex: search, $options: "i" }; // Regex search for product names (case-insensitive)
      }
      if (category) {
        filter.category = category; // Filtering by category if provided
      }

      // Setting up sorting options based on the sort parameter
      const sortOption = {};
      if (sort === "rating") {
        sortOption.rating = -1; // Sorting by rating in descending order
      } else if (sort === "priceLowToHigh") {
        sortOption.price = 1; // Sorting by price in ascending order
      } else if (sort === "priceHighToLow") {
        sortOption.price = -1; // Sorting by price in descending order
      }

      // Counting total number of products that match the filter criteria
      const totalProducts = await productCollection.countDocuments(filter);

      // Fetching products from the database based on filter, sort, pagination settings
      const products = await productCollection
        .find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .toArray(); // Converting result to an array

      // Responding with the total count and products list
      res.json({ totalProducts, products });
    });
  } finally {
    // Leaving client connection open to avoid closing it on each request
    // await client.close();
  }
}
run().catch(console.dir); // Handling errors during MongoDB connection setup

// Root route to verify server is running
app.get("/", (req, res) => {
  res.send("WDA Products Filter server is running!");
});

// Starting the Express server on specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
