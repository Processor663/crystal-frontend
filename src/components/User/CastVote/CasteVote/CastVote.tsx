import NavBar from "@/components/shared/NavBar/NavBar";
import VotingStatusCard from "../../VotingStatusCard/VotingStatusCard";

const CastVote = () => {
  return (
    <>
      <div className=" my-5 lg:flex gap-5">
        <div className="w-full lg:flex-1">
          <VotingStatusCard />
        </div>
        <div className="lg:w-[25%] bg-amber-200">2</div>
      </div>
    </>
  );
};

export default CastVote;
