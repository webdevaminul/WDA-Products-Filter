import useProducts from "../hooks/useProducts";

export default function Home() {
  const [products] = useProducts();

  console.log(products);
  return (
    <div className="container mx-auto">
      <h1>Products</h1>
    </div>
  );
}
