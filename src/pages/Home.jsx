import useProducts from "../hooks/useProducts";

export default function Home() {
  const [products] = useProducts();
  console.log(products);

  return (
    <div className="container mx-auto flex flex-col md:flex-row mt-4">
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

      <main>main</main>
    </div>
  );
}
