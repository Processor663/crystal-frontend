import { memo } from "react";
import { useLocation } from "react-router-dom";

import { IoMdCheckmark } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";

export type VotingStepStatus = "complete" | "pending";

export interface VotingStep {
  id: string;
  title: string;
  detail: string;
  status: VotingStepStatus;
}

interface VotingStatusCardProps {
  steps?: VotingStep[];
}

const defaultSteps: VotingStep[] = [
  {
    id: "identity",
    title: "NIN Verification",
    detail: "Verified",
    status: "complete",
  },
  {
    id: "Email",
    title: "Email Verification",
    detail: "Verified",
    status: "complete",
  },
  {
    id: "vote",
    title: "Voting Eligibility",
    detail: "You are eligible to vote.",
    status: "complete",
  },
];

export default memo(function VotingStatusCard({
  steps = defaultSteps,
}: VotingStatusCardProps) {
  const { pathname } = useLocation();
  const cast = pathname.includes("vote")
    ? "flex items-center gap-4 gap-4 bg-[#22c55e12] p-3 border border-[#22c55e26] rounded-xl"
    : " flex items-center gap-4 ";

  return (
    <div className="w-full  rounded-2xl border border-border bg-surface p-6 shadow-lg">
      <h2 className="mb-5 text-base font-semibold text-white">
        Your Voting Status
      </h2>

      <ul className="space-y-5">
        {steps.map((step) => {
          const isComplete = step.status === "complete";
          return (
            <li key={step.id} className={`${cast}`}>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${
                  isComplete
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                    : "border-amber-500/40 bg-amber-500/10 text-amber-400"
                }`}
              >
                {isComplete ? (
                  <IoMdCheckmark className="h-4 w-4" />
                ) : (
                  <CiClock2 className="h-4 w-4" />
                )}
              </span>
              <div>
                <p className="text-sm font-medium text-white">{step.title}</p>
                <p className="text-xs text-slate-400">{step.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
