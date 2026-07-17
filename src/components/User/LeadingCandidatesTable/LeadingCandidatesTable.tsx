import { memo } from "react";

export interface LeadingCandidateTableRow {
  id: string;
  name: string;
  votes: number;
  voteShare: number; // 0 - 100
  position: string;
  color: string;
}

interface LeadingCandidatesTableProps {
  rows?: LeadingCandidateTableRow[];
}

const defaultRows: LeadingCandidateTableRow[] = [
  {
    id: "cj",
    name: "Chijioke",
    votes: 1093439,
    voteShare: 38.4,
    position: "SUG PRO",
    color: "#7C6AF4",
  },
  {
    id: "fa",
    name: "F. Al-Rashid",
    votes: 903228,
    voteShare: 31.7,
    position: "Vice-President",
    color: "#2DD4BF",
  },
  {
    id: "bo",
    name: "B. Oluwole",
    votes: 539027,
    voteShare: 18.9,
    position: "Secretary",
    color: "#F59E0B",
  },
  {
    id: "nk",
    name: "N. Kalu",
    votes: 313797,
    voteShare: 11.0,
    position: "president",
    color: "#EC4899",
  },
  {
    id: "nk",
    name: "N. Kalu",
    votes: 313797,
    voteShare: 11.0,
    position: "president",
    color: "#EC4899",
  },
];

function formatVotes(n: number) {
  return n.toLocaleString("en-US");
}

export default memo(function LeadingCandidatesTable({
  rows = defaultRows,
}: LeadingCandidatesTableProps) {
  return (
    <div className="w-full h-full rounded-2xl border border-border bg-surface p-5 shadow-lg">
      <h2 className="font-bold text-white">Leading Candidates</h2>
      <p className="mb-5 text-slate-400">Performance Overview</p>

      <div className=" overflow-y-auto max-h-dvh ">
        <table className="border-collapse md:w-full w-[150%] ">
          <thead className="sticky top-0 bg-surface">
            <tr className="border-b border-border text-xs uppercase tracking-wider text-slate-500">
              <th className="pb-3 font-medium">Candidate</th>
              <th className="pb-3 font-medium">Position</th>
              <th className="pb-3 font-medium">Votes</th>
              <th className="pb-3 font-medium">Vote Share</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-3">
                    <span className={`text-sm  "font-normal `}>{row.name}</span>
                  </td>
                  <td className="py-3">
                    <span className={`text-sm  "font-normal `}>
                      {row.position}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="font-mono text-sm text-slate-300">
                      {formatVotes(row.votes)}
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: row.color }}
                    >
                      {row.voteShare.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                      Leading
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});
