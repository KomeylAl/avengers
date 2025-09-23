import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/auth/user");
      return res.json();
    },
  });
}
