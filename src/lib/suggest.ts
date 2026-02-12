import type { ZXCVBNResult } from "zxcvbn";
import { WORDS } from "./words";

function hasLikelyPersonalPattern(pw: string): boolean {
  // Very rough heuristic: common date-like patterns.
  return /\b(19|20)\d{2}\b/.test(pw) || /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/.test(pw);
}

export function buildSuggestions(password: string, zx: ZXCVBNResult | null): string[] {
  const tips: string[] = [];

  if (!password) {
    return [
      "Use 4–6 random words for a passphrase",
      "Use a password manager for unique passwords",
      "Enable MFA or passkeys"
    ];
  }

  if (password.length < 12) tips.push("Increase length to 16+ characters (or 4–6 words)");
  if (hasLikelyPersonalPattern(password)) tips.push("Remove dates/personal info");
  if (zx?.score !== undefined && zx.score <= 1) tips.push("Avoid common words/patterns (zxcvbn flagged this)");
  tips.push("Avoid password reuse across sites");
  tips.push("Prefer passphrases with separators (e.g., word-word-word-word)");
  tips.push("Enable MFA (authenticator) or passkeys for strong protection");

  // zxcvbn feedback
  const fb = zx?.feedback;
  if (fb?.warning) tips.push(Fix: ${fb.warning});
  for (const s of fb?.suggestions ?? []) tips.push(s);

  // de-dupe & cap
  return Array.from(new Set(tips)).slice(0, 10);
}

function randInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function pickWord(): string {
  return WORDS[randInt(WORDS.length)];
}

function genPassphrase(words = 5): string {
  const sepOptions = ["-", ".", "_"];
  const sep = sepOptions[randInt(sepOptions.length)];
  const parts = Array.from({ length: words }, () => pickWord());

  // Capitalize one random word for variety (still passphrase-friendly)
  const idx = randInt(parts.length);
  parts[idx] = parts[idx].charAt(0).toUpperCase() + parts[idx].slice(1);

  // Add 2-digit number at the end sometimes (optional)
  const addNumber = Math.random() < 0.6;
  const tail = addNumber ? ${sep}${randInt(90) + 10} : "";

  return parts.join(sep) + tail;
}

function genRandomString(len = 18): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}:,.?";
  const chars = (alphabet + symbols).split("");

  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[randInt(chars.length)];
  }
  return out;
}

export function generateAlternatives(saferMode: boolean, count = 10): string[] {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    if (saferMode) out.push(genPassphrase(4 + randInt(3))); // 4–6 words
    else out.push(genRandomString(16 + randInt(9))); // 16–24 chars
  }
  return out;
}
