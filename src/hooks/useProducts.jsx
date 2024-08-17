import { useQuery } from "@tanstack/react-query";

export default function useProducts() {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/products");
    },
  });
}
