import { Outlet } from "react-router-dom";

//components
import SideBar from "@/components/shared/SideBar/SideBar/SideBar";

//Icons
import { LuLayoutDashboard } from "react-icons/lu";

import { BsActivity } from "react-icons/bs";
import { MdHowToVote, MdSettings } from "react-icons/md";

export const navItems = [
  {
    desc: "Dashboard",
    path: "",
    icon: LuLayoutDashboard,
  },
  {
    desc: "Cast Vote",
    path: "vote",
    icon: MdHowToVote,
  },
  {
    desc: "Live Scores",
    path: "live",
    icon: BsActivity,
  },
  {
    desc: "Settings",
    path: "settings",
    icon: MdSettings,
  },
];

function userLayout() {
  return (
    <>
      <div className="flex overflow-hidden">
        <div className="hidden lg:block w-[18%]  bg-surface">
          <SideBar navItems={navItems} />
        </div>
        <div className=" w-full md:flex-1  p-2 lg:p-5 lg:h-dvh lg:overflow-y-auto">
          <Outlet />
        </div>
      </div>
     
    </>
  );
}

export default userLayout;
