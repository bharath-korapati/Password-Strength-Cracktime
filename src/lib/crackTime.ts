import { formatDuration } from "./format";

export type CrackRow = {
  key: string;
  label: string;
  guessesPerSecond: number;
  expectedSeconds: number;
  expectedDisplay: string;
  rangeDisplay: string;
  note?: string;
};

export type CrackTimeReport = {
  guesses: number;
  rows: CrackRow[];
};

const SCENARIOS = [
  {
    key: "online_rate_limited",
    label: "Online (rate-limited)",
    guessesPerSecond: 10 / 60, // 10 attempts / minute
    note: "Strong rate limits + lockouts make this slower."
  },
  {
    key: "offline_fast_hash",
    label: "Offline (fast hash / GPU)",
    guessesPerSecond: 1e10,
    note: "Worst case if hashes are fast & attacker has strong hardware."
  },
  {
    key: "offline_slow_hash",
    label: "Offline (slow hash like bcrypt/argon2)",
    guessesPerSecond: 1e4,
    note: "Proper slow hashing reduces guessing speed a lot."
  }
] as const;

function clampSeconds(s: number): number {
  // prevent absurd UI values; still communicates “very large”
  return Math.min(s, 1e18);
}

export function buildCrackTime(guesses: number): CrackTimeReport {
  const g = Math.max(1, Math.floor(guesses));
  // average time ≈ half the search space
  const expectedGuesses = g / 2;

  const rows: CrackRow[] = SCENARIOS.map((sc) => {
    const expectedSeconds = clampSeconds(expectedGuesses / sc.guessesPerSecond);
    const bestSeconds = clampSeconds(1 / sc.guessesPerSecond); // lucky first try
    const worstSeconds = clampSeconds(g / sc.guessesPerSecond);

    return {
      key: sc.key,
      label: sc.label,
      guessesPerSecond: sc.guessesPerSecond,
      expectedSeconds,
      expectedDisplay: formatDuration(expectedSeconds),
      rangeDisplay: ${formatDuration(bestSeconds)} – ${formatDuration(worstSeconds)},
      note: sc.note
    };
  });

  return { guesses: g, rows };
}
