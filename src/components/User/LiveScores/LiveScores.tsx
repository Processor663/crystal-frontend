import LeadingCandidatesProgress from "../UserDashboard/LeadingCandidatesProgress/LeadingCandidatesProgress";
import SecurityStatus from "../Vote/SecurityStatus/SecurityStatus";
import TimeRemaining from "../Vote/TimeRemaining/TimeRemaining";
import VoterTurnout from "../Vote/VoteTurnOut/VoteTurnOut";

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
      <div className="flex-1 bg-amber-200">main</div>
    </div>
  );
};

export default LiveScores;
