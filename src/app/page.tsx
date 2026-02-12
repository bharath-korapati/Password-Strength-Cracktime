"use client";

import { useMemo, useState } from "react";
import PasswordInputCard from "@/components/PasswordInputCard";
import StrengthMeter from "@/components/StrengthMeter";
import CrackTimeCard from "@/components/CrackTimeCard";
import SuggestionsCard from "@/components/SuggestionsCard";

import zxcvbn from "zxcvbn";
import { buildCrackTime } from "@/lib/crackTime";

export default function HomePage() {
  const [pw, setPw] = useState("");
  const [saferMode, setSaferMode] = useState(true);

  const zx = useMemo(() => {
    if (!pw) return null;
    return zxcvbn(pw);
  }, [pw]);

  const crack = useMemo(() => {
    if (!zx) return null;
    return buildCrackTime(zx.guesses);
  }, [zx]);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
        <h1 className="text-xl font-semibold">Password Strength + Crack-Time Detector</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          Awareness tool only. Avoid pasting real passwords used on important accounts.
          Estimates depend on attacker hardware, hashing, and rate limits.
        </p>
      </div>

      <PasswordInputCard
        value={pw}
        onChange={setPw}
        saferMode={saferMode}
        onToggleSaferMode={() => setSaferMode((v) => !v)}
      />

      <StrengthMeter password={pw} zxcvbnResult={zx} />

      <CrackTimeCard password={pw} zxcvbnResult={zx} crack={crack} />

      <SuggestionsCard password={pw} zxcvbnResult={zx} saferMode={saferMode} />
    </div>
  );
}
