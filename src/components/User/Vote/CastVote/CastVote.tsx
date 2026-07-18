import { useState } from "react";
import { CiCircleCheck } from "react-icons/ci";

import { motion } from "framer-motion";


export interface VoteCandidate {
  id: string;
  name: string;
  manifesto: string;
  initials: string;
  color: string;
}

export interface VotePosition {
  id: string;
  title: string;
  description?: string;
  candidates: VoteCandidate[];
}

interface CastVoteProps {
  positions?: VotePosition[];
//   onSubmit?: (selections: Record<string, string>) => void;
}

const defaultPositions: VotePosition[] = [
  {
    id: "president",
    title: "President",
    description: "Choose one candidate",
    candidates: [
      {
        id: "cj",
        name: "Chukwuemeka James",
        manifesto: "Renewed hope, With God all thing are possible. I am processor, i am software engineer. i am a data analyst",
        initials: "CJ",
        color: "#7C6AF4",
      },
      {
        id: "fa",
        name: "Fatima Al-Rashid",
        manifesto: "Unity Congress",
        initials: "FA",
        color: "#2DD4BF",
      },
      {
        id: "bo",
        name: "Babatunde Oluwole",
        manifesto: "Reform Movement",
        initials: "BO",
        color: "#F59E0B",
      },
      {
        id: "nk",
        name: "Ngozi Kalu",
        manifesto: "Citizens First",
        initials: "NK",
        color: "#EC4899",
      },
    ],
  },
  {
    id: "secretary",
    title: "Secretary",
    description: "Choose one candidate",
    candidates: [
      {
        id: "ao",
        name: "Amaka Obi",
        manifesto: "Progressive Alliance",
        initials: "AO",
        color: "#7C6AF4",
      },
      {
        id: "ke",
        name: "Kelechi Eze",
        manifesto: "Unity Congress",
        initials: "KE",
        color: "#2DD4BF",
      },
    ],
  },
  {
    id: "fin-secretary",
    title: "Financial Secretary",
    description: "Choose one candidate",
    candidates: [
      {
        id: "ib",
        name: "Ifeoma Bello",
        manifesto: "Progressive Alliance",
        initials: "IB",
        color: "#7C6AF4",
      },
      {
        id: "ta",
        name: "Tunde Adewale",
        manifesto: "Reform Movement",
        initials: "TA",
        color: "#F59E0B",
      },
      {
        id: "sm",
        name: "Sade Musa",
        manifesto: "Citizens First",
        initials: "SM",
        color: "#EC4899",
      },
    ],
  },
];

export default function CastVote({
  positions = defaultPositions,
}: CastVoteProps) {
  const [selections, setSelections] = useState<Record<string, string>>({});

  const totalPositions = positions.length;
  const completed = Object.keys(selections).length;
  const allSelected = completed === totalPositions;

  const handleSelect = (positionId: string, candidateId: string) => {
    setSelections((prev) => ({ ...prev, [positionId]: candidateId }));
  };

  const handleSubmit = () => {
    if (!allSelected) return;
//    (selections); tthis contains the value of the selected candidates for voting
  };

  return (
    <div className="w-full  ">
      <div className="bg-surface shadow-lg rounded-2xl  border border-border p-5 mt-5">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Cast Your Vote</h2>
            <p className="text-sm text-slate-400">
              Select one candidate per position
            </p>
          </div>
          <span className="rounded-full border border-[#7C6AF4]/30 bg-[#7C6AF4]/10 px-3 py-1 text-xs font-semibold text-[#A78BFA]">
            {completed}/{totalPositions} selected
          </span>
        </div>

        <div className="space-y-8">
          {positions.map((position) => (
            <div key={position.id}>
              <h3 className="mb-1 text-sm font-semibold text-white">
                {position.title}
              </h3>
              {position.description && (
                <p className="mb-3 text-xs text-slate-500">
                  {position.description}
                </p>
              )}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {position.candidates.map((candidate) => {
                  const isSelected = selections[position.id] === candidate.id;
                  return (
                    <button
                      key={candidate.id}
                      type="button"
                      onClick={() => handleSelect(position.id, candidate.id)}
                      className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                        isSelected
                          ? "border-accent bg-[#7C6AF4]/10 shadow-[0_0_0_1px_rgba(124,106,244,0.4)]"
                          : "border border-border bg-bg "
                      }`}
                    >
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: `${candidate.color}33`,
                          color: candidate.color,
                        }}
                      >
                        {candidate.initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">
                          {candidate.name}
                        </p>

                        <div className="overflow-hidden whitespace-nowrap w-35 md:w-70">
                          <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: "linear",
                            }}
                          >
                            <p className="truncate text-xs text-slate-400">
                              {candidate.manifesto}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          isSelected
                            ? "border-[#7C6AF4] bg-[#7C6AF4]"
                            : "border-white/20"
                        }`}
                      >
                        {isSelected && (
                          <CiCircleCheck className="h-3 w-3 text-white" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-surface p-5 rounded-2xl mt-5">
        <div>
          <h2 className="text-text text-[0.875rem] font-light">
            Confirm and cast
          </h2>
          <p className="text-[0.6875rem]">
            Review your selection before submitting
          </p>
        </div>
        <p className="rounded-lg mt-5 py-3 px-2 lg:px-5 text-[#D4A017] bg-[#cd881914] border-[0.5px] border-[#f5a52433]">
          Your vote is final and cannot be changed after submission. Confirm
          your candidate carefully before casting.
        </p>
        <button
          type="button"
          disabled={!allSelected}
          onClick={handleSubmit}
          className={`mt-8 w-full rounded-xl py-3 text-sm font-bold transition-colors ${
            allSelected
              ? "bg-[#7C6AF4] text-white hover:bg-[#6D5AE0]"
              : "cursor-not-allowed bg-white/5 text-slate-500"
          }`}
        >
          {allSelected
            ? "Submit Vote"
            : `Select ${totalPositions - completed} more to continue`}
        </button>
      </div>
    </div>
  );
}
