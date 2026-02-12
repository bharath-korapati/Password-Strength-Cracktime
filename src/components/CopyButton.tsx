"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="shrink-0 rounded-lg border border-zinc-200 px-2 py-1 text-xs hover:bg-white dark:border-zinc-800 dark:hover:bg-zinc-950"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 900);
      }}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
