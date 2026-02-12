"use client";

import type { ZXCVBNResult } from "zxcvbn";
import type { CrackTimeReport } from "@/lib/crackTime";
import { fmtNumber } from "@/lib/format";
import Badge from "./Badge";

export default function CrackTimeCard(props: {
  password: string;
  zxcvbnResult: ZXCVBNResult | null;
  crack: CrackTimeReport | null;
}) {
  const { password, zxcvbnResult, crack } = props;

  return (
    <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold">Crack-time estimate</h2>
        <Badge>Scenario-based</Badge>
      </div>

      {!password || !zxcvbnResult || !crack ? (
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">Enter a password to see estimates.</p>
      ) : (
        <>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            These estimates assume an attacker needs ~half the search space on average.
            They vary widely based on hashing and hardware.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-zinc-500 dark:text-zinc-400">
                <tr>
                  <th className="py-2 pr-4">Scenario</th>
                  <th className="py-2 pr-4">Rate</th>
                  <th className="py-2 pr-4">Expected time</th>
                  <th className="py-2 pr-4">Range</th>
                </tr>
              </thead>
              <tbody>
                {crack.rows.map((r) => (
                  <tr key={r.key} className="border-t border-zinc-200 dark:border-zinc-800">
                    <td className="py-3 pr-4">
                      <div className="font-medium">{r.label}</div>
                      {r.note ? <div className="text-xs text-zinc-500 dark:text-zinc-400">{r.note}</div> : null}
                    </td>
                    <td className="py-3 pr-4">{fmtNumber(r.guessesPerSecond)}/sec</td>
                    <td className="py-3 pr-4 font-medium">{r.expectedDisplay}</td>
                    <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-300">{r.rangeDisplay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200">
            <div className="font-medium">What to do next</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-600 dark:text-zinc-300">
              <li>Use a unique long password (or passphrase) for each site.</li>
              <li>Enable MFA (authenticator app) or passkeys if available.</li>
              <li>Password managers make strong, unique passwords easy.</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
