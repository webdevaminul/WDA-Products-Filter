import { useQuery } from "@tanstack/react-query";

export default function useProducts(searchTerm, selectedCategory, sortOption, currentPage) {
  const {
    data: productsData = { products: [] },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", searchTerm, selectedCategory, sortOption, currentPage],
    queryFn: async () => {
      const query = new URLSearchParams({
        search: searchTerm,
        category: selectedCategory,
        sort: sortOption,
        page: currentPage,
      }).toString();
      const res = await fetch(`http://localhost:5000/products?${query}`);
      return res.json();
    },
  });

  return [productsData.products, productsData.totalProducts, isLoading, refetch];
}
