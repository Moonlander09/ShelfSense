import { useQuery } from "@tanstack/react-query";

export function useMe() {
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
                method: "GET",
                credentials: "include",});
                
            if (!res.ok) {
                throw new Error("Failed to fetch user data");
            }
            return res.json();
        }
    })
            

}
