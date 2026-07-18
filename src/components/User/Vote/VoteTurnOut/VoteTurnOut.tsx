interface VoterTurnoutProps {
  votesCast: number;
  registeredVoters: number;
  targetPercent?: number;
}

function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}

export default function VoterTurnout({
  votesCast,
  registeredVoters,
  targetPercent = 70,
}: VoterTurnoutProps) {
  const turnoutPercent =
    registeredVoters > 0 ? (votesCast / registeredVoters) * 100 : 0;
  const displayPercent = Math.min(turnoutPercent, 100);

  return (
    <div className="w-full rounded-md border border-border bg-surface p-6 shadow-lg my-5">
      <h2 className="mb-5 text-xs font-semibold tracking-widest">
        VOTER TURNOUT
      </h2>

      <div className="mb-6 text-center">
        <p className="text-4xl font-bold text-white">
          {turnoutPercent.toFixed(1)}%
        </p>
        <p className="mt-1 text-sm text-slate-400">of registered voters</p>
      </div>

      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#7C6AF4] to-[#A78BFA] transition-all duration-500"
          style={{ width: `${displayPercent}%` }}
        />
      </div>

      <dl className="space-y-3">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-slate-400">Votes cast</dt>
          <dd className="text-sm font-semibold text-white">
            {formatNumber(votesCast)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm text-slate-400">Registered</dt>
          <dd className="text-sm font-semibold text-white">
            {formatNumber(registeredVoters)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm text-slate-400">Target</dt>
          <dd className="text-sm font-semibold text-emerald-400">
            {targetPercent}%
          </dd>
        </div>
      </dl>
    </div>
  );
}
