"use client";

import { ImagePlus, Link as LinkIcon, Upload, X } from "lucide-react";
import { ClipboardEvent, DragEvent, useMemo, useRef, useState } from "react";

type ImageUploadFieldProps = {
  defaultValue?: string | null;
};

export function ImageUploadField({ defaultValue }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(defaultValue ?? "");
  const [filePreview, setFilePreview] = useState("");
  const [dragging, setDragging] = useState(false);
  const preview = filePreview || imageUrl;

  const helperText = useMemo(() => {
    if (filePreview) {
      return "New image selected. It will upload when you save.";
    }

    if (imageUrl) {
      return "Using image URL.";
    }

    return "Drag image here, choose file, paste image, or paste URL.";
  }, [filePreview, imageUrl]);

  function assignFile(file: File) {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files;
    }

    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }

    setFilePreview(URL.createObjectURL(file));
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files.item(0);

    if (file) {
      assignFile(file);
    }
  }

  function onPaste(event: ClipboardEvent<HTMLDivElement>) {
    const imageItem = Array.from(event.clipboardData.items).find((item) => item.type.startsWith("image/"));
    const text = event.clipboardData.getData("text").trim();

    if (imageItem) {
      const file = imageItem.getAsFile();
      if (file) {
        assignFile(file);
        event.preventDefault();
      }
      return;
    }

    if (text.startsWith("http://") || text.startsWith("https://")) {
      setImageUrl(text);
      event.preventDefault();
    }
  }

  function clearImage() {
    setImageUrl("");
    setFilePreview("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="md:col-span-2">
      <label className="text-sm font-bold text-slate-700">Image</label>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            inputRef.current?.click();
          }
        }}
        onPaste={onPaste}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`mt-2 grid min-h-44 cursor-pointer gap-4 rounded-xl border border-dashed p-4 outline-none transition md:grid-cols-[180px_1fr] ${
          dragging ? "border-blue-500 bg-blue-50 ring-4 ring-blue-100" : "border-slate-300 bg-slate-50 hover:bg-blue-50"
        }`}
      >
        <div
          className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-white bg-cover bg-center shadow-sm ring-1 ring-slate-100"
          style={preview ? { backgroundImage: `url("${preview}")` } : undefined}
        >
          {preview ? (
            <span className="sr-only">Selected admin upload preview</span>
          ) : (
            <ImagePlus className="h-10 w-10 text-slate-300" />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-lg bg-blue-950 px-3 py-2 text-xs font-bold text-white">
              <Upload className="h-4 w-4" /> Choose File
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
              <LinkIcon className="h-4 w-4" /> Paste URL
            </span>
            {preview ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  clearImage();
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600"
              >
                <X className="h-4 w-4" /> Clear
              </button>
            ) : null}
          </div>
          <p className="mt-4 text-sm font-semibold text-slate-700">{helperText}</p>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Supports drag-drop, direct file selection, pasted image from clipboard, or copied image URL.
          </p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        name="image_file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.item(0);
          if (file) {
            assignFile(file);
          }
        }}
      />
      <input
        name="image_url"
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
        onPaste={(event) => {
          const value = event.clipboardData.getData("text").trim();
          if (value.startsWith("http://") || value.startsWith("https://")) {
            setImageUrl(value);
          }
        }}
        placeholder="Or paste image URL here"
        className="mt-3 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}
