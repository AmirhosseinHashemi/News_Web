"use client";

import { Image as ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export function CoverUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  }

  function removePreview() {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);

    if (inputRef.current) inputRef.current.value = "";
  }

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
              type="button"
              variant="secondary"
              size="sm"
              onClick={openFilePicker}
            >
              تغییر تصویر
            </Button>

            <Button
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
    </div>
  );
}
