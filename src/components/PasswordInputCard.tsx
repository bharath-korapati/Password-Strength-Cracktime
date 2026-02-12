"use client";

import { useMemo, useState } from "react";
import Badge from "./Badge";

export default function PasswordInputCard(props: {
  value: string;
  onChange: (v: string) => void;
  saferMode: boolean;
  onToggleSaferMode: () => void;
}) {
  const { value, onChange, saferMode, onToggleSaferMode } = props;
  const [show, setShow] = useState(false);

  const length = useMemo(() => value.length, [value]);

  return (
    <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">Check a password</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Tip: prefer long passphrases + MFA/passkeys.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge>{length} chars</Badge>
          <button
            type="button"
            className="rounded-xl border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            onClick={() => setShow((v) => !v)}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={show ? "text" : "password"}
          placeholder="Type a test password (avoid real passwords)"
          className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-base outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-zinc-700"
          autoComplete="off"
          spellCheck={false}
          inputMode="text"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          Mode: <span className="font-medium">{saferMode ? "Safer (passphrases)" : "Complex (random strings)"}</span>
        </div>
        <button
          type="button"
          className="rounded-xl border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
          onClick={onToggleSaferMode}
        >
          Toggle mode
        </button>
      </div>

      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
        This app is for awareness. Crack-time is an estimate and depends on hashing, attacker hardware, and defenses.
      </p>
    </div>
  );
}
