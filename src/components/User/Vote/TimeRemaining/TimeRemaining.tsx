import { useEffect, useState } from "react";

interface TimeRemainingProps {
  targetDate: Date | string;
  title?: string;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function TimeRemaining({
  targetDate,
  title = "Time Remaining",
}: TimeRemainingProps) {
  const target =
    typeof targetDate === "string" ? new Date(targetDate) : targetDate;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const units: { label: string; value: number }[] = [
    { label: "HRS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEC", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full rounded-2xl border border-white/5 bg-[#0D0F14] p-6 shadow-lg">
      <h2 className="mb-4 text-xs font-semibold tracking-widest text-slate-400">
        {title.toUpperCase()}
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="rounded-xl border border-white/5 bg-white/[0.03] py-4 text-center"
          >
            <p className="font-mono text-3xl font-bold text-white">
              {pad(unit.value)}
            </p>
            <p className="mt-1 text-[10px] tracking-widest text-slate-500">
              {unit.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
