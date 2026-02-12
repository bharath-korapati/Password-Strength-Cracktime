"use client";

import type { ZXCVBNResult } from "zxcvbn";
import { buildSuggestions, generateAlternatives } from "@/lib/suggest";
import CopyButton from "./CopyButton";
import Badge from "./Badge";

export default function SuggestionsCard(props: {
  password: string;
  zxcvbnResult: ZXCVBNResult | null;
  saferMode: boolean;
}) {
  const { password, zxcvbnResult, saferMode } = props;

  const tips = buildSuggestions(password, zxcvbnResult);
  const alts = generateAlternatives(saferMode, 10);

  return (
    <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold">Improve it</h2>
        <Badge>{saferMode ? "Passphrases" : "Random strings"}</Badge>
      </div>

      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        Stronger in practice means: longer + unique + MFA/passkeys. Avoid reuse and personal info.
      </p>

      <div className="mt-4">
        <div className="text-sm font-medium">Actionable fixes</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tips.map((t, i) => (
            <span
              key={i}
              className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Safer alternatives</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Generated locally</div>
        </div>

        <div className="mt-2 grid gap-2">
          {alts.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <code className="truncate text-sm">{p}</code>
              <CopyButton text={p} />
            </div>
          ))}
        </div>

        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          Tip: For important accounts, prefer a password manager and enable MFA/passkeys.
        </p>
      </div>
    </div>
  );
}
