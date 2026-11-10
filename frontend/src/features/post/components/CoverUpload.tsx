"use client";

import { Image as ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useDeleteCoverMutation } from "@/features/media/hooks/useDeleteCoverMutation";
import { useUploadCoverMutation } from "@/features/media/hooks/useUploadCoverMutation";

interface CoverUploadProps {
  value?: number;
  onChange: (coverId: number | undefined) => void;
}

export function CoverUpload({ onChange, value }: CoverUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const {
    mutate: uploadCover,
    isPending: isPendingUpload,
    data: uploadData,
  } = useUploadCoverMutation();
  const { mutate: deleteCover, isPending: isPendingDelete } =
    useDeleteCoverMutation();
  const isLoading = isPendingDelete || isPendingUpload;

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    uploadCover(file, {
      onSuccess: (res) => {
        if (res.success) {
          onChange(res.data.id);
          toast.add({
            type: "success",
            description: res.message,
          });
        }

        if (!res.success) {
          toast.add({
            type: "error",
            description: res.message,
          });
        }
      },
    });
  }

  function removePreview() {
    if (!uploadData && preview) {
      setPreview(null);
      onChange(undefined);
    }

    if (uploadData && uploadData.success) {
      deleteCover(uploadData.data.publicId, {
        onSuccess: (res) => {
          if (res.success) {
            setPreview(null);
            onChange(undefined);

            if (inputRef.current) inputRef.current.value = "";

            toast.add({
              type: "succcess",
              description: res.message,
            });
          }

          if (!res.success)
            toast.add({
              type: "error",
              description: res.message,
            });
        },
      });
    }
  }

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileChange}
      />

      {preview ? (
        <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
          <Image
            src={preview}
            alt="پیش‌نمایش تصویر شاخص"
            fill
            unoptimized
            sizes="(min-width: 1024px) 22rem, 100vw"
            className="object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-linear-to-t from-black/60 to-transparent p-2">
            <Button
              disabled={isLoading}
              type="button"
              variant="secondary"
              size="sm"
              onClick={openFilePicker}
            >
              {isLoading ? "در حال بارگذاری ..." : "تغییر تصویر"}
            </Button>

            <Button
              disabled={isLoading}
              type="button"
              variant="destructive"
              size="icon-sm"
              onClick={removePreview}
              aria-label="حذف تصویر شاخص"
            >
              <Trash2 aria-hidden="true" />
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={openFilePicker}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/30 px-4 py-8 text-center transition-colors hover:border-primary hover:bg-primary/5"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-muted">
            <ImageIcon
              className="size-5 text-muted-foreground"
              aria-hidden="true"
            />
          </span>
          <span className="text-sm font-medium">انتخاب تصویر شاخص</span>
          <span className="text-xs text-muted-foreground">
            PNG یا JPG، حداکثر ۵ مگابایت
          </span>
        </button>
      )}
      {value && (
        <p className="mt-2 text-xs text-muted-foreground" dir="ltr">
          PublicId:{" "}
          {uploadData && uploadData.success && uploadData.data.publicId}
        </p>
      )}
    </div>
  );
}
