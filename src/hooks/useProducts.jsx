import { useQuery } from "@tanstack/react-query";

export default function useProducts() {
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/products");
      return res.json();
    },
  });

  return [products, isLoading, refetch];
}
