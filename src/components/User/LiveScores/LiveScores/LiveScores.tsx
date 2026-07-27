import { memo } from "react";
import LeadingCandidatesProgress from "../../UserDashboard/LeadingCandidatesProgress/LeadingCandidatesProgress";
import TimeRemaining from "../../Vote/TimeRemaining/TimeRemaining";
import VoterTurnout from "../../Vote/VoteTurnOut/VoteTurnOut";
import PresidentResultsCard from "../CandidateResult/CandidateResult";

const LiveScores = () => {
  return (
    <div className="lg:flex flex-row-reverse gap-5 mt-5">
      <div className="lg:w-[30%]">
        <TimeRemaining targetDate="2026-07-18T18:00:00" />
        <VoterTurnout
          votesCast={2847491}
          registeredVoters={4491200}
          targetPercent={70}
        />
        <LeadingCandidatesProgress />
      </div>
      <div className="flex-1">
        <PresidentResultsCard />
      </div>
    </div>
  );
};

export default memo(LiveScores);
