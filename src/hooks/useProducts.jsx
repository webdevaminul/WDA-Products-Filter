import { useQuery } from "@tanstack/react-query";

export default function useProducts(searchTerm, selectedCategory) {
  const {
    data: productsData = { products: [] },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", searchTerm, selectedCategory],
    queryFn: async () => {
      const query = new URLSearchParams({
        search: searchTerm,
        category: selectedCategory,
      });
      const res = await fetch(`http://localhost:5000/products?${query}`);
      return res.json();
    },
  });

  return [productsData.products, isLoading, refetch];
}
