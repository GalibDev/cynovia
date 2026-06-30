"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        if (!window.confirm(`Delete ${label}?`)) {
          event.preventDefault();
        }
      }}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-red-50 px-2.5 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
    >
      <Trash2 className="h-4 w-4" /> Delete
    </button>
  );
}
