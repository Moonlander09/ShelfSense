import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOutRequest } from "@/helper/signoutRequest";

export function useSignout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["signout"],
    mutationFn: signOutRequest,
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["me"] }); // ONLY this
    },
  });
}
