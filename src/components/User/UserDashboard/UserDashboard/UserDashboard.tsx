//Components
import ElectionStatsRow from "@/components/User/UserDashboard/StatCard/StatCard";
import LeadingCandidatesTable from "../LeadingCandidatesTable/LeadingCandidatesTable";
import LeadingCandidatesProgress from "../LeadingCandidatesProgress/LeadingCandidatesProgress";
import VotingStatusCard from "../../Vote/VotingStatusCard/VotingStatusCard";

function UserDashboard() {
  return (
    <>
      <div className="stat-container pb-5">
        <ElectionStatsRow />
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
