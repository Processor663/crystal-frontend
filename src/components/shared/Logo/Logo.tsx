// Icons
import { BsStar } from "react-icons/bs";

function Logo() {
  return (
    <>
      <div className="icon-container flex justify-center items-center flex-col ">
        <span className="bg-accent p-3 rounded-[10px]">
          <BsStar size="20" className="text-text"/>
        </span>
        <p className="text-text font-serif tracking-[-0.3px] text-[1.25rem]">CrystalVote</p>
        <p className=" font-mono text-center">Secure Election Platform</p>
      </div>
    </>
  );
}

export default Logo;
