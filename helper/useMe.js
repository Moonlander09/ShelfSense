import { useQuery } from "@tanstack/react-query";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        // No token = not logged in
        throw new Error("No auth token");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }

      return res.json();
    },
    retry: false, // important: avoid loops on auth failure
  });
}