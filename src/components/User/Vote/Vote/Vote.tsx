// Components
import VotingStatusCard from "../VotingStatusCard/VotingStatusCard";
import CastVote from "../CastVote/CastVote";
import TimeRemaining from "../TimeRemaining/TimeRemaining";
import VoterTurnout from "../VoteTurnOut/VoteTurnOut";

const Vote = () => {
  return (
    <>
      <div className=" my-5 lg:flex gap-5">
        <div className="w-full lg:flex-1">
          <VotingStatusCard />
          <div>
            <CastVote />
          </div>
        </div>

        <div className="lg:w-[25%] bg-gray-500">
          {/* <TimeRemaining /> */}
          {/* <VoterTurnout /> */}
        </div>
      </div>
    </>
  );
};

export default Vote;
