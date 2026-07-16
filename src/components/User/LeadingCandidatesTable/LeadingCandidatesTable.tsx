export interface OpponentComparisonRow {
  id: string;
  name: string;
  votes: number;
  share: number; // 0 - 100
  deltaFromLeader: number; // 0 for leader, negative for others
  color: string;
}

interface OpponentComparisonProps {
  rows?: OpponentComparisonRow[];
}

const defaultRows: OpponentComparisonRow[] = [
  {
    id: "cj",
    name: "Chijioke",
    votes: 1093439,
    share: 38.4,
    deltaFromLeader: 0,
    color: "#7C6AF4",
  },
  {
    id: "fa",
    name: "F. Al-Rashid",
    votes: 903228,
    share: 31.7,
    deltaFromLeader: -6.7,
    color: "#2DD4BF",
  },
  {
    id: "bo",
    name: "B. Oluwole",
    votes: 539027,
    share: 18.9,
    deltaFromLeader: -19.5,
    color: "#F59E0B",
  },
  {
    id: "nk",
    name: "N. Kalu",
    votes: 313797,
    share: 11.0,
    deltaFromLeader: -27.4,
    color: "#EC4899",
  },
];

function formatVotes(n: number) {
  return n.toLocaleString("en-US");
}

export default function LeadingCandidatesTable({
  rows = defaultRows,
}: OpponentComparisonProps) {
  return (
    <div className="w-full h-full  rounded-2xl border border-border bg-surface p-6 shadow-lg">
      <h2 className="text-lg font-bold text-white">Opponent Comparison</h2>
      <p className="mb-5 text-sm text-slate-400">Head-to-head metrics</p>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wider text-slate-500">
            <th className="pb-3 font-medium">Candidate</th>
            <th className="pb-3 font-medium">Votes</th>
            <th className="pb-3 font-medium">Share</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {rows.map((row) => {
            const leading = row.deltaFromLeader === 0;
            return (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="py-4">
                  <span
                    className={`text-sm  "font-normal `}
                  >
                    {row.name}
                  </span>
                </td>
                <td className="py-4">
                  <span className="font-mono text-sm text-slate-300">
                    {formatVotes(row.votes)}
                  </span>
                </td>
                <td className="py-4">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: row.color }}
                  >
                    {row.share.toFixed(1)}%
                  </span>
                </td>
                <td className="py-4">
                  {leading ? (
                    <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                      Leading
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400">
                      {row.deltaFromLeader.toFixed(1)}%
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
