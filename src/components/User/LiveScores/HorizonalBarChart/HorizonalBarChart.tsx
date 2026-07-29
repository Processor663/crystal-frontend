import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface Candidate {
  name: string;
  percent: number;
}

const candidates: Candidate[] = [
  { name: "John Daniel", percent: 42.7 },
  { name: "Chioma Faith", percent: 31.5 },
  { name: "David Okafor", percent: 16.8 },
  { name: "Blessing Uche", percent: 6.1 },
  { name: "Others", percent: 3.0 },
];

const BAR_COLOR = "#8B7FF5";
const BAR_HEIGHT = 34;
const BAR_GAP = 6;

export default function CandidateHorizontalBarChart() {
  const chartHeight = candidates.length * (BAR_HEIGHT + BAR_GAP);

  return (
    <div className="bg-surface p-5  border border-border rounded-2xl">
      <div style={{ width: "100%", height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={candidates}
            layout="vertical"
            barCategoryGap={BAR_GAP}
            margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
          >
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              width={100}
              tick={{ fill: "#8B87A8", fontSize: 13 }}
            />
            <Bar dataKey="percent" maxBarSize={BAR_HEIGHT}>
              {candidates.map((c) => (
                <Cell key={c.name} fill={BAR_COLOR} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
