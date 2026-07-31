import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
} from "recharts";

//ICONS
import { IoPersonOutline } from "react-icons/io5";

type chartData = {
  percent: number;
  name: string;
  votes: number;
};

interface HorizontalBarProps {
  title: string;
  votes: number;
  yAxisWidth: number
  data: chartData[];
}

const categories = [
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

const BAR_BACKGROUND = "#2A2D3E";
const BAR_COLOR = "#8B7FF5";
const BAR_HEIGHT = 25;
const BAR_GAP = 6;

export function HorizontalBarChart({ votes, title, yAxisWidth, data }: HorizontalBarProps) {
  const chartHeight = data.length * (BAR_HEIGHT + BAR_GAP);

  return (
    <div className="bg-surface py-5  border border-border rounded-2xl h-full pl-3">
      <div className="flex flex-col mb-5">
        <div className="">
          <div className="flex gap-1">
            <div className="bg-accent/20 py-1.5 px-1 rounded-sm">
              <IoPersonOutline size={18} color="#FFF" />
            </div>
            <div className="leading-3.5 pl-2">
              <h3 className="text-text font-semibold">
                {title?.toUpperCase()}
              </h3>
              <p className="text-slate-400 mt-1">
                Total votes: {votes.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            barCategoryGap={BAR_GAP}
            margin={{ top: 0, right: 55, bottom: 0, left: 0 }}
          >
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              width={yAxisWidth}
              // tick={{ fill: "#8B87A8", fontSize: 12 }}
              tick={({ y, payload }) => (
                <text
                  x={0}
                  y={y}
                  dy={4}
                  textAnchor="start"
                  fill="#8B87A8"
                  fontSize={13}
                >
                  {payload.value}
                </text>
              )}
            />
            <Bar
              dataKey="percent"
              maxBarSize={BAR_HEIGHT}
              fill={BAR_COLOR}
              background={{ fill: BAR_BACKGROUND }}
            >
              <LabelList
                dataKey="percent"
                position="right"
                formatter={(value) => `${Number(value).toFixed(1)}%`}
                style={{ fill: "#CBD5E1", fontSize: 13 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function CandidateHorizontalBarChart() {
  return (
    <>
      {categories.map((category) => {
        const totalVotes = category.candidates.reduce(
          (sum, candidate) => sum + candidate.votes,
          0,
        );

        //A function that shorten name
        const formatName = (name: string) => {
          const parts = name.trim().split(" ");

          if (parts.length <= 1) return name;

          const lastName = parts[parts.length - 1];
          const initials = parts
            .slice(0, -1)
            .map((part) => `${part[0]}.`)
            .join(" ");

          return `${initials} ${lastName}`;
        };

        const chartData = category.candidates.map((candidate) => ({
          ...candidate,
          name: formatName(candidate.name),
          percent:
            totalVotes > 0
              ? Number(((candidate.votes / totalVotes) * 100).toFixed(1))
              : 0,
        }));

        // A function to get accurate width for horizontal bar
        const yAxisWidth =
          Math.max(...chartData.map((item) => item.name.length)) * 8;
        return (
          <div>
            <HorizontalBarChart
              key={category.id}
              data={chartData}
              title={category.name}
              votes={totalVotes}
              yAxisWidth={yAxisWidth}
            />
          </div>
        );
      })}
    </>
  );
}
