import { BsActivity } from "react-icons/bs";



export interface CandidateVoteShare {
  id: string;
  initials: string;
  name: string;
  category: string;
  percent: number; // 0 - 100
  color: string; // tailwind-safe hex, e.g. "#7C6AF4"
}

interface LiveVoteDistributionProps {
  candidates?: CandidateVoteShare[];
  updatedEverySeconds?: number;
}

const defaultCandidates: CandidateVoteShare[] = [
  {
    id: "cj",
    initials: "CJ",
    name: "Chukwuemeka James",
    category: "Secretary",
    percent: 38.4,
    color: "#7C6AF4",
  },
  {
    id: "fa",
    initials: "FA",
    name: "Fatima Al-Rashid",
    category: "President",
    percent: 31.7,
    color: "#2DD4BF",
  },
  {
    id: "bo",
    initials: "BO",
    name: "Babatunde Oluwole",
    category: "Director of socials",
    percent: 18.9,
    color: "#F59E0B",
  },
  {
    id: "nk",
    initials: "NK",
    name: "Ngozi Kalu",
    category: "SUG PRO",
    percent: 11.0,
    color: "#EC4899",
  },
];

export default function LeadingCandidatesProgress({
  candidates = defaultCandidates,
  updatedEverySeconds = 30,
}: LiveVoteDistributionProps) {
  return (
    <div className="w-full rounded-2xl border border-border bg-surface p-6 shadow-lg">
      <div className="mb-6 flex items-center gap-2">
        <BsActivity className="h-5 w-5 text-[#7C6AF4]" />
        <div>
          <h2 className="text-base font-semibold text-white">
            Leading Candidates
          </h2>
          <p className="text-xs text-slate-400">
            Updated every {updatedEverySeconds} seconds
          </p>
        </div>
      </div>

      <ul className="space-y-5">
        {candidates.map((c) => (
          <li key={c.id}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: `${c.color}33`, color: c.color }}
                >
                  {c.initials}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{c.name}</p>
                  <p className="text-xs text-slate-400">{c.category}</p>
                </div>
              </div>
              <span className="text-sm font-bold" style={{ color: c.color }}>
                {c.percent.toFixed(1)}%
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${c.percent}%`, backgroundColor: c.color }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
