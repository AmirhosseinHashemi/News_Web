import { deleteMediaAction } from "@/features/media/media.action";
import { useMutation } from "@tanstack/react-query";

export function useDeleteCoverMutation() {
  return useMutation({
    mutationFn: deleteMediaAction,
  });
}
