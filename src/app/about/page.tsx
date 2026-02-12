export default function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">About</h1>

      <div className="rounded-2xl border border-zinc-200 p-5 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
        <p>
          Bharath’s Password Strength & Crack-Time Detector is a defensive security-awareness project. It helps users
          understand password strength and improve habits (unique passwords, passphrases, MFA/passkeys).
        </p>
        <p className="mt-3">
          This tool is not a hacking utility. It does not attempt to access accounts or perform password guessing.
        </p>
      </div>
    </div>
  );
}
