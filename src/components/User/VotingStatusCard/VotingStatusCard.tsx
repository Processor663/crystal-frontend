import { CiCircleCheck } from "react-icons/ci";
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
    title: "Identity Verified",
    detail: "NIN: ••••••4782",
    status: "complete",
  },
  {
    id: "ward",
    title: "Ward Assigned",
    detail: "Lagos Mainland · Ward 07",
    status: "complete",
  },
  {
    id: "vote",
    title: "Vote Pending",
    detail: "You have not voted yet",
    status: "pending",
  },
];

export default function VotingStatusCard({
  steps = defaultSteps,
}: VotingStatusCardProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-lg">
      <h2 className="mb-5 text-base font-semibold text-white">
        Your Voting Status
      </h2>

      <ul className="space-y-5">
        {steps.map((step) => {
          const isComplete = step.status === "complete";
          return (
            <li key={step.id} className="flex items-center gap-4">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${
                  isComplete
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                    : "border-amber-500/40 bg-amber-500/10 text-amber-400"
                }`}
              >
                {isComplete ? (
                  <CiCircleCheck className="h-4 w-4" />
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
}
