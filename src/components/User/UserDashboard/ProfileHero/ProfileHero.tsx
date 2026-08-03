import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

// Icons
import { FaTriangleExclamation } from "react-icons/fa6";

const chartData = [
  { name: "Group A", value: 100, color: "#FA8C16" },
  { name: "Group D", value: 20, color: "#dddce3" },
];

const isProfileComplete = !false;

const size = 120;
const innerRadius = 46;
const outerRadius = 60;
const ProfileHero = () => {
  return (
    isProfileComplete && (
      <div className="mt-5 md:mt-0 p-5 text-text rounded-2xl border border-border bg-surface">
        <div className="w-full space-y-5 md:flex justify-between">
          <div className="">
            <div className="flex gap-2 items-center ">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7C6AF4]/20 text-lg font-bold text-[#A78BFA] border border-accent">
                AC
              </div>
              <div>
                <h1 className="text-xl font-bold text-text">John Doe</h1>
                <p className="text-slate-400">Candidate</p>
              </div>
            </div>

            <div className="md:flex items-center gap-2 mt-5 space-y-4 md:space-y-0">
              <div className="flex items-center gap-2 bg-[#fa8c161e] md:rounded-2xl py-2 px-3 mt-2 border border-[#FA8C16]">
                <FaTriangleExclamation color=" #FA8C16" />
                <span className="text-xs text-text">Manifesto Not Added</span>
              </div>
              <div className="flex items-center gap-2 bg-[#fa8c161e] md:rounded-2xl py-2 px-3 mt-2 border border-[#FA8C16]">
                <FaTriangleExclamation color=" #FA8C16" />
                <span className="text-xs text-text">
                  Profile Picture Not Added
                </span>
              </div>
            </div>
          </div>

          <div
            className="relative flex items-center justify-center mx-auto md:mx-0"
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
                  isAnimationActive={true}
                  shape={(props) => (
                    <Sector {...props} fill={props.payload.color} />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Dashed inner ring accent, matching the reference chart */}
            <div
              className="absolute rounded-full border-2 border-dashed border-text-muted"
              style={{
                width: innerRadius * 2 - 12,
                height: innerRadius * 2 - 12,
              }}
            />
            <div className="absolute flex flex-col items-center justify-center text-center">
              <h2 className="font-semibold text-white text-[1rem]">80%</h2>
              <p className=" font-semibold text-white text-[.7rem]">Complete</p>
            </div>
          </div>
        </div>
        <p className="mt-5 md:mt-0">
          Complete your profile by adding a profile picture and manifesto to
          help voters recognize you and make informed voting decisions. Visit
          Settings to get started.
        </p>
      </div>
    )
  );
};

export default ProfileHero;
