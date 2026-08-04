import { memo } from "react";
import type { ReactNode } from "react";
import { Wrapper } from "./StatCard.styles";

type AccentColor = "purple" | "teal" | "rose" | "amber";

interface StatCardProps {
  label: string;
  value: ReactNode;
  change?: string;
  changeType?: "positive" | "neutral";
  accent?: AccentColor;
}

const accentClasses: Record<AccentColor, string> = {
  purple: "bg-violet-500/25",
  teal: "bg-teal-500/25",
  amber: "bg-amber-500/25",
  rose: "bg-rose-500/25",
};

function StatCard({
  label,
  value,
  change,
  changeType = "positive",
  accent = "purple",
}: StatCardProps) {
  return (
    <Wrapper>
      <div className="relative overflow-hidden rounded-2xl bg-surface  border border-border p-5">
        <div className={`half-circle ${accentClasses[accent]} `}></div>

        <div>
          <p className="text-[0.6875rem]  tracking-widest text-slate-400 uppercase">
            {label}
          </p>
          <p className=" text-[1.75rem] font-bold text-white">{value}</p>
          {change && (
            <p
              className={` text-[0.75rem] ${changeType === "positive" ? "text-emerald-400" : "text-slate-400"}`}
            >
              {changeType === "positive" && "↑ "}
              {change}
            </p>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default memo(function ElectionStatsRow() {
  return (
    <div className="bg-[#0B0D12] pt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Votes Cast"
          value="2,847,491"
          change="14.2% vs last hour"
          accent="purple"
        />
        <StatCard
          label="Voter Turnout"
          value="63.4%"
          change="Target: 70%"
          accent="teal"
        />
        <StatCard
          label="Registered Voters"
          value="63.4%"
          change="Target: 70%"
          accent="amber"
        />
        <StatCard
          label="Time Remaining"
          value="4h 22m"
          change="Closes 8:00 PM WAT"
          changeType="neutral"
          accent="rose"
        />
      </div>
    </div>
  );
});
