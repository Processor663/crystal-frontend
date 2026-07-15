import Logo from "../../Logo/Logo";
import SideItem from "../SideBarItem/SideBarItem";

// types
import  type{SideBarProps} from "@/components/types/navItem.types"

//Icons
import { PiSignOutThin } from "react-icons/pi";



const SideBar = (props: SideBarProps) => {
  return (
    <div className="hidden md:block">
      <div className="my-10">
        <Logo />
      </div>
      <SideItem {...props} />
      <div className="flex gap-3 mt-60 mb-10  leading-4  justify-center">
        <div className=" text-text rounded-full h-10 w-10 bg-accent flex items-center justify-center">
          AO
        </div>
        <div className="user-chip">
          <p className="text-text text-[1rem]">Adebayo Okafor</p>
          <small className="text-center">Registered Voter</small>
          <div className="flex gap-1 text-text items-center mt-3  transition-transform duration-200 hover:scale-105">
            <PiSignOutThin size="20" />
            <small>sign out</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
