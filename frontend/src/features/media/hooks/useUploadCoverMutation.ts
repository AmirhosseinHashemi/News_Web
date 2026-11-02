import { uploadMediaAction } from "@/features/media/media.action";
import { useMutation } from "@tanstack/react-query";

export function useUploadCoverMutation() {
  return useMutation({
    mutationFn: uploadMediaAction,
  });
}
