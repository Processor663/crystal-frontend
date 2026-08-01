import { memo } from "react";
import TimeRemaining from "../../Vote/TimeRemaining/TimeRemaining";
import VoterTurnout from "../../Vote/VoteTurnOut/VoteTurnOut";
import ResultsCard from "../CandidateResult/CandidateResult";
import LeadingCandidatesProgress from "../../UserDashboard/LeadingCandidates/LeadingCandidates";

// This suppose to come from API
const totalVote = (1847491).toLocaleString();

const LiveScores = () => {
  return (
    <div className="mt-5">
      <div>
        <h2 className="text-white! mb-1!">Real-Time Results</h2>
        <p className="mb-5">Total votes {totalVote}</p>
      </div>
      <div className="lg:flex flex-row-reverse gap-5 mt-5">
        <div className="lg:w-[30%] mb-5 lg:mb-0">
          <TimeRemaining targetDate="2026-07-18T18:00:00" />
          <VoterTurnout />
          <LeadingCandidatesProgress />
        </div>
        <div className="flex-1">
          <ResultsCard />
        </div>
      </div>
    </div>
  );
};

export default memo(LiveScores);
