export default function LearnPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Learn</h1>

      <section className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h2 className="font-semibold">Why crack time varies</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          A password can be guessed online (usually rate-limited) or cracked offline if an attacker gets a password
          database. Offline cracking speed depends heavily on the hashing algorithm: fast hashes can be tested much
          quicker than slow hashes like bcrypt/argon2.
        </p>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h2 className="font-semibold">Best practical protection</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
          <li>Use a password manager to create unique passwords for every site.</li>
          <li>Prefer long passphrases (4–6 random words) for memorability.</li>
          <li>Enable MFA (authenticator app) or passkeys where available.</li>
          <li>Avoid reuse, personal info, and predictable substitutions (like P@ssw0rd).</li>
        </ul>
      </section>
    </div>
  );
}
