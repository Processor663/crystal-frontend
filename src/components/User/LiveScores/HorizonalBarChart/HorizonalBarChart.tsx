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
  data: chartData[];
}

const categories = [
  {
    id: "president",
    name: "President",
    candidates: [
      { name: "Emma", votes: 5213 },
      { name: "Uche", votes: 4213 },
      { name: "John", votes: 5213 },
      { name: "Chioma", votes: 894 },
    ],
  },
  {
    id: "secretary",
    name: "Secretary",
    candidates: [
      { name: "Mary", votes: 800 },
      { name: "James", votes: 600 },
    ],
  },
  {
    id: "sug-pro",
    name: "SUG PRO",
    candidates: [
      { name: "Mary", votes: 800 },
      { name: "James", votes: 600 },
    ],
  },
  {
    id: "Treasurer",
    name: "Treasurer",
    candidates: [
      { name: "Mary", votes: 800 },
      { name: "James", votes: 10 },
    ],
  },
];

const BAR_COLOR = "#8B7FF5";
const BAR_HEIGHT = 25;
const BAR_GAP = 6;

export function HorizontalBarChart({ votes, title, data }: HorizontalBarProps) {
  const chartHeight = data.length * (BAR_HEIGHT + BAR_GAP);

  return (
    <div className="bg-surface py-5  border border-border rounded-2xl">
      <div className="flex flex-col items-center mb-5">
        <div className="flex items-center gap-1">
          <IoPersonOutline
            size={20}
            color="#FFF"
            style={{ backgroundColor: "#8b7ff561", padding:"4px", borderRadius: "3px"}}
          />
          <h6 className="text-text">{title}</h6>
        </div>
        <p>Total votes: {votes}</p>
      </div>
      <div style={{ width: "100%", height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            barCategoryGap={BAR_GAP}
            margin={{ top: 0, right: 48, bottom: 0, left: 0 }}
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
            <Bar dataKey="percent" maxBarSize={BAR_HEIGHT} fill={BAR_COLOR}>
              <LabelList
                dataKey="votes"
                position="right"
                formatter={(value) => Number(value).toLocaleString()}
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

        const chartData = category.candidates.map((candidate) => ({
          ...candidate,
          percent:
            totalVotes > 0
              ? Number(((candidate.votes / totalVotes) * 100).toFixed(1))
              : 0,
        }));

        return (
          <div className="">
            <HorizontalBarChart
              key={category.id}
              data={chartData}
              title={category.name}
              votes={totalVotes}
            />
          </div>
        );
      })}
    </>
  );
}
