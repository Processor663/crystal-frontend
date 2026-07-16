import App_Drawer from "@/components/shared/Drawer/Drawer";
import ElectionStatsRow from "@/components/shared/StatCard/StatCard";
import LeadingCandidatesTable from "../LeadingCandidatesTable/LeadingCandidatesTable";
import LeadingCandidatesProgress from "../LeadingCandidatesProgress/LeadingCandidatesProgress";
import VotingStatusCard from "../VotingStatusCard/VotingStatusCard";

import { motion } from "framer-motion";

function UserDashboard() {
  return (
    <>
      <div className="flex-1 py-5">
        <h1 className="text-text hidden lg:block">Voter Dashboard</h1>
        <div className="flex justify-between align-center">
          {/* Mobile Navbar */}
          <div className="lg:hidden">
            <App_Drawer />
          </div>
          <div className="lg:hidden">
            <div>
              <div>
                <p>Welcome back, Adebayo</p>
                <div className="overflow-hidden whitespace-nowrap w-35 md:w-70">
                  <motion.div
                    // className="flex gap-8"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "linear",
                    }}
                  >
                    <p className="text-text">
                      {" "}
                      Federal Election 2025................ Federal Election
                      2025
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          <div className="sub">
            {" "}
            {/* //Dynamic content */}
            <p className="hidden lg:block">Welcome back, Adebayo</p>
            {/* //Dynamic content */}
            <div className="text-text hidden lg:block"></div>
          </div>
          <div className="flex gap-2 items-center">
            {" "}
            <div className="bg-[rgba(34, 197, 94, 0.1)] rounded-2xl px-3 py-1 text-green font-mono text-[0.75rem] border border-[rgba(34, 197, 94, 0.25)]">
              <span className="inline-block w-[7px] h-[7px] rounded-full bg-green animate-[pulse_1s_infinite] mr-1"></span>
              Voting Open
            </div>
            <span className="hidden lg:block bg-purple rounded-2xl text-text text-[0.75rem] px-3 py-1">
              Cast Your Vote
            </span>
          </div>
        </div>
        <div className="stat-container">
          <ElectionStatsRow />
        </div>
      </div>
      <div className="lg:flex gap-4 ">
        <div className="flex-1 md:overflow-auto">
          {/* This should return leading candidate in each category of election */}
          <LeadingCandidatesTable />
        </div>
        <div className="lg:w-[30%]">
          <div className="hidden lg:block">
            <VotingStatusCard />
          </div>
          <div className="mt-5">
            <LeadingCandidatesProgress />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
