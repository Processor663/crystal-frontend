import { useMemo } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import CandidateHorizontalBarChart from "../HorizonalBarChart/HorizonalBarChart";

interface Candidate {
  name: string;
  votes: number;
  percent: number;
  color: string;
}

const candidates: Candidate[] = [
  {
    name: "John Daniel",
    votes: 1213,
    percent: 42.7,
    color: "#22C55E",
  },
  {
    name: "Chioma Faith",
    votes: 894,
    percent: 31.5,
    color: "#3B82F6",
  },
  {
    name: "David Okafor",
    votes: 478,
    percent: 16.8,
    color: "#F59E0B",
  },
  {
    name: "Blessing Uche",
    votes: 172,
    percent: 6.1,
    color: "#8B5CF6",
  },
];

const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

interface DonutChartProps {
  data: Candidate[];
  centerValue: number;
}

function DonutChart({ data, centerValue }: DonutChartProps) {
  const size = 200;
  const innerRadius = 62;
  const outerRadius = 88;

  const chartData = useMemo(
    () => data.map((c) => ({ name: c.name, value: c.percent, color: c.color })),
    [data],
  );

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <ResponsiveContainer width={size} height={size}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={90}
            endAngle={-270}
            stroke="none"
            isAnimationActive={false}
            shape={(props) => <Sector {...props} fill={props.payload.color} />}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Dashed inner ring accent, matching the reference chart */}
      <div
        className="absolute rounded-full border-2 border-dashed border-violet-400/70"
        style={{
          width: innerRadius * 2 - 12,
          height: innerRadius * 2 - 12,
        }}
      />

      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-semibold text-white">
          {centerValue.toLocaleString()}
        </span>
        <span className="text-xs text-gray-400">votes</span>
      </div>
    </div>
  );
}

export default function ResultsCard() {
  return (
    <div className="">
      <div className="grid md:grid-cols-2 gap-5">
        <CandidateHorizontalBarChart />
      </div>
      <div className="border border-border mt-5 p-5 pt-6 flex flex-col items-center gap-4 rounded-2xl">
        <DonutChart data={candidates} centerValue={totalVotes} />

        <div className="flex flex-col gap-2 w-full">
          {candidates.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-sm"
                  style={{ backgroundColor: c.color }}
                />
                <span className="text-gray-300">{c.name}</span>
              </div>
              <span className="font-medium" style={{ color: c.color }}>
                {c.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
