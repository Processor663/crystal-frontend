import { memo } from "react";
import { BsActivity } from "react-icons/bs";

interface CandidateData {
  name: string;
  votes: number;
}

export interface Candidates {
  id:string,
  name: string,
  candidates: CandidateData[];
}

interface LeadingCandidatesProps {
  candidates?: Candidates[];
  updatedEverySeconds?: number;
}

const defaultCandidates = [
  {
    id: "president",
    name: "President",
    candidates: [
      { name: "O Chukwuemeka NwaChuwuemeka", votes: 5213 },
      { name: "Uche", votes: 4213 },

      { name: "Emma", votes: 5213 },
      { name: "Uche", votes: 4213 },
    ],
  },
  {
    id: "secretary",
    name: "Secretary",
    candidates: [
      { name: "Mary Emenike", votes: 800 },
      { name: "James jude", votes: 600 },
    ],
  },
  {
    id: "sug-pro",
    name: "SUG PRO",
    candidates: [
      { name: "Mary Chukwuemeka", votes: 800 },
      { name: "James Chukwuemeka", votes: 600 },
    ],
  },
  {
    id: "Treasurer",
    name: "Treasurer",
    candidates: [
      { name: "Mary Chukwuemeka", votes: 1004 },
      { name: "James Mike", votes: 1 },
    ],
  },
  {
    id: "Vice-President",
    name: "Vice-President",
    candidates: [
      { name: "Mary Chukwuemeka", votes: 1004 },
      { name: "James Chukwuemeka", votes: 1 },
    ],
  },
  {
    id: "Assistant-Sec.Gen",
    name: "Assistant-Sec.Gen",
    candidates: [
      { name: "Chukwuemeka Mary", votes: 1004 },
      { name: "Chukwuemeka James", votes: 1 },
    ],
  },
];

export default memo(function LeadingCandidates({
  candidates = defaultCandidates,
  updatedEverySeconds = 30,
}: LeadingCandidatesProps) {
  return (
    <div className="w-full rounded-2xl border border-border bg-surface p-6 pt-0 shadow-lg sticky top-0 overflow-y-auto  max-h-100">
      <div className="mb-6 pt-5 pb-3 flex items-center gap-2 sticky top-0 bg-surface">
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

     <p>mmmmmmmmmmmmmmmmmmm</p>
    </div>
  );
});
