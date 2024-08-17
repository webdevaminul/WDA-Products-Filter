import { useState } from "react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

export default function Home() {
  const categories = ["Electronics", "Fashion", "Home Appliances"];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, totalProducts, isLoading] = useProducts(
    searchTerm,
    selectedCategory,
    sortOption,
    currentPage
  );
  const productsPerPage = 8;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Hide pagination if fewer products than productsPerPage
  const shouldShowPagination = totalProducts > productsPerPage;

  return (
    <div className="container mx-auto flex flex-col md:flex-row mt-4 gap-4">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-slate-100 p-4">
        <h3 className="font-bold mb-2">Filter By Category</h3>
        <ul>
          <li>
            <label>
              <input
                type="radio"
                name="category"
                className="mr-2"
                value=""
                onChange={(e) => {
                  setSelectedCategory("");
                  setCurrentPage(1);
                }}
              />
              All Categories
            </label>
          </li>

          {categories.map((category) => (
            <li key={category}>
              <label>
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="mr-2"
                />
                {category}
              </label>
            </li>
          ))}
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
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            className="mt-2 md:mt-0 p-2 border border-slate-300 rounded w-full md:w-fit"
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Sort By</option>
            <option value="rating">Rating</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <span className="loading loading-ring loading-md"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {shouldShowPagination && (
          <div className="flex justify-center mt-4 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-2 bg-slate-300 rounded-md mr-2 disabled:cursor-not-allowed disabled:bg-slate-100 select-none"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`p-2 rounded-md select-none ${
                  currentPage === i + 1 ? "bg-blue-400 text-white" : "bg-slate-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-2 bg-slate-300 rounded-md ml-2 disabled:cursor-not-allowed disabled:bg-slate-100 select-none"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
