// Components
import VotingStatusCard from "../VotingStatusCard/VotingStatusCard";
import CastVote from "../CastVote/CastVote";
import TimeRemaining from "../TimeRemaining/TimeRemaining";
import VoterTurnout from "../VoteTurnOut/VoteTurnOut";
import SecurityStatus from "../SecurityStatus/SecurityStatus";

const Vote = () => {
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row  my-5  gap-5">
        <div className="w-full lg:flex-1">
          <VotingStatusCard />
          <div>
            <CastVote />
          </div>
        </div>

        <div className="lg:w-[25%]">
          <TimeRemaining targetDate="2026-07-18T18:00:00" />
          <VoterTurnout
            votesCast={2847491}
            registeredVoters={4491200}
            targetPercent={70}
          />
          <SecurityStatus />
        </div>
      </div>
    </>
  );
};

export default Vote;
