import { describe, expect, it } from "vitest";
import { buildCrackTime } from "@/lib/crackTime";

describe("buildCrackTime", () => {
  it("returns rows for all scenarios", () => {
    const r = buildCrackTime(1000000);
    expect(r.rows.length).toBeGreaterThanOrEqual(3);
    expect(r.guesses).toBeGreaterThanOrEqual(1);
  });

  it("handles small guesses safely", () => {
    const r = buildCrackTime(0);
    expect(r.guesses).toBe(1);
  });
});
