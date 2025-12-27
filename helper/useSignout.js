import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOutRequest } from "@/helper/signoutRequest";

export function useSignout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["signout"],
    mutationFn: signOutRequest,
    onSuccess: (data) => {
      // ✅ REMOVE TOKEN (MOST IMPORTANT)
      localStorage.removeItem("accessToken");

      // ✅ CLEAR USER CACHE
      queryClient.removeQueries({ queryKey: ["me"] });
    },
  });
}