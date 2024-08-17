import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

export default function Home() {
  const [products] = useProducts();
  console.log(products);

  return (
    <div className="container mx-auto flex flex-col md:flex-row mt-4 gap-4">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-slate-100 p-4">
        <h3 className="font-bold mb-2">Filter By Category</h3>
        <ul>
          <li>
            <label>
              <input type="radio" name="category" className="mr-2" />
              All Categories
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="category" className="mr-2" />
              Electronics
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="category" className="mr-2" />
              Fashion
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="category" className="mr-2" />
              Home Appliances
            </label>
          </li>
        </ul>
      </aside>

      {/* Main */}
      <main className="w-full md:w-3/4">
        {/* Search Bar and Sorting Options */}
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-1/2 p-2 border border-slate-300 rounded"
          />

          <select className="mt-2 md:mt-0 p-2 border border-slate-300 rounded w-full md:w-fit">
            <option value="">Sort By</option>
            <option value="rating">Rating</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      </main>
    </div>
  );
}
