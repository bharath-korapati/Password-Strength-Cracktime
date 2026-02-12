export default function PrivacyPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Privacy</h1>

      <div className="rounded-2xl border border-zinc-200 p-5 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
        <p>
          This app is designed to run password analysis in your browser. It does not intentionally transmit passwords
          to a server. Do not paste real passwords used on important accounts.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>No analytics or tracking are included by default.</li>
          <li>No password storage is implemented.</li>
          <li>Crack-time is an estimate and depends on real-world conditions.</li>
        </ul>
      </div>
    </div>
  );
}
