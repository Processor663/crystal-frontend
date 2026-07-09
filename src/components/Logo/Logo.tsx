// Icons
import { BsStar } from "react-icons/bs";

function Logo() {
  return (
    <>
      <div className="icon-container flex justify-center items-center flex-col ">
        <span className="bg-accent p-4 rounded-[10px]">
          <BsStar size="20" className="text-text"/>
        </span>
        <h1 className="text-text">CrystalVote</h1>
        <p className="">Secure Election Platform</p>
      </div>
    </>
  );
}

export default Logo;
