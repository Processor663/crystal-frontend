import Logo from "../../Logo/Logo";
import SideItem from "../SideBarItem/SideBarItem";

// types
import type { SideBarProps } from "@/types/navItem.types";

//Icons
import { PiSignOutThin } from "react-icons/pi";

//Custom Hooks
import { useLogout } from "@/hooks/useLogout";

const SideBar = (props: SideBarProps) => {
const logout  = useLogout();

  return (
    <div>
      <div className="my-10">
        <Logo />
      </div>

      <SideItem {...props} />
      <div className="flex gap-3 mt-30 p-2 leading-4 ">
        <div className=" text-text rounded-full h-10 w-10 bg-accent flex items-center justify-center">
          AO
        </div>
        <div className="user-chip ">
          <p className="text-text text-[1rem]">Adebayo Okafor</p>
          <small className="text-center">Registered Voter</small>
          <div className="flex gap-1 text-text items-center mt-3  transition-transform duration-200 hover:scale-105">
            <PiSignOutThin size="20" className="text-amber" />
            <button className="text-amber text-xs" onClick={logout}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
