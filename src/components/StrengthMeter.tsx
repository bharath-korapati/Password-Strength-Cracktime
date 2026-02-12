"use client";

import type { ZXCVBNResult } from "zxcvbn";
import Badge from "./Badge";

const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"] as const;

export default function StrengthMeter(props: { password: string; zxcvbnResult: ZXCVBNResult | null }) {
  const { password, zxcvbnResult } = props;

  const score = password ? (zxcvbnResult?.score ?? 0) : 0;
  const label = labels[Math.min(4, Math.max(0, score))];

  const pct = (score / 4) * 100;

  return (
    <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold">Strength</h2>
        <Badge>{label}</Badge>
      </div>

      <div className="mt-3 h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-3 rounded-full bg-zinc-900 transition-all duration-300 dark:bg-zinc-100"
          style={{ width: ${password ? pct : 0}% }}
        />
      </div>

      <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
        {password ? (
          <>
            Estimated guesses: <span className="font-medium">{(zxcvbnResult?.guesses ?? 0).toLocaleString()}</span>
          </>
        ) : (
          "Type a password to see feedback."
        )}
      </div>

      {password && zxcvbnResult?.feedback?.warning ? (
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
          <span className="font-medium">Warning:</span> {zxcvbnResult.feedback.warning}
        </p>
      ) : null}

      {password && zxcvbnResult?.feedback?.suggestions?.length ? (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
          {zxcvbnResult.feedback.suggestions.slice(0, 4).map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
