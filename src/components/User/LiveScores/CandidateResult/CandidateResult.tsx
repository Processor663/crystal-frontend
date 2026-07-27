import  { useMemo } from "react";
import { Card, Typography } from "antd";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const { Title, Text } = Typography;

interface Candidate {
  name: string;
  party: string;
  votes: number;
  percent: number;
  color: string;
}

const candidates: Candidate[] = [
  {
    name: "John Daniel",
    party: "Visionary squad",
    votes: 1213,
    percent: 42.7,
    color: "#22C55E",
  },
  {
    name: "Chioma Faith",
    party: "Progressive team",
    votes: 894,
    percent: 31.5,
    color: "#3B82F6",
  },
  {
    name: "David Okafor",
    party: "Unity alliance",
    votes: 478,
    percent: 16.8,
    color: "#F59E0B",
  },
  {
    name: "Blessing Uche",
    party: "New generation",
    votes: 172,
    percent: 6.1,
    color: "#8B5CF6",
  },
  { name: "Others", party: "", votes: 85, percent: 3.0, color: "#6B7280" },
];

const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
const pollingUnitsPercent = 87.5;

interface DonutChartProps {
  data: Candidate[];
  centerValue: number;
}

/**
 * Donut chart built on recharts' Pie/Cell, with a dashed inner accent
 * ring and centered total overlaid on top (recharts doesn't do dashed
 * decorative rings natively, so that part stays a plain CSS overlay).
 *
 * Percent values are passed straight in as `value` and mapped once via
 * `useMemo` rather than mutated inside a render-time loop — that
 * mutation (a shared `cumulativePercent` reassigned inside `.map()`)
 * is what triggered the "Cannot reassign variable after render
 * completes" error in the previous version. React (and
 * eslint-plugin-react-compiler) requires render to be a pure function
 * with no shared-variable mutation across iterations.
 */
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

export default function PresidentResultsCard() {
  return (
    <Card
      className=" !bg-[#0D0F14] !rounded-2xl"
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
      styles={{ body: { padding: "24px" } }}
    >
      <Title level={4} className="!text-white !mb-1">
        President
      </Title>
      <Text className="!text-gray-400 !text-sm block mb-5">
        {totalVotes.toLocaleString()} votes counted, {pollingUnitsPercent}% of
        polling units
      </Text>

      <div className="flex flex-col gap-4 mb-6">
        {candidates.map((c, i) => (
          <div
            key={c.name}
            className="pl-3"
            style={
              i === 0
                ? { borderLeft: `2px solid ${c.color}` }
                : { borderLeft: "2px solid transparent" }
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white m-0">{c.name}</p>
                {c.party && (
                  <p className="text-xs text-gray-500 m-0">{c.party}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300">
                  {c.votes.toLocaleString()}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: c.color }}
                >
                  {c.percent}%
                </span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${c.percent}%`, backgroundColor: c.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-6 flex flex-col items-center gap-4">
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
    </Card>
  );
}
