import { Outlet } from "react-router-dom";

//components
import SideBar from "@/components/shared/SideBar/SideBar/SideBar";

//Icons
import { LuLayoutDashboard } from "react-icons/lu";

import { BsActivity } from "react-icons/bs";
import { MdHowToVote, MdSettings } from "react-icons/md";
import NavBar from "@/components/shared/NavBar/NavBar";

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
    path: "live-scores",
    icon: BsActivity,
  },
  {
    desc: "Settings",
    path: "settings",
    icon: MdSettings,
  },
];

function userSideBarLayout() {
  return (
    <>
      <div className="flex overflow-hidden">
        <div className="hidden lg:block w-[18%]  bg-surface">
          <SideBar navItems={navItems} />
        </div>
        <div className=" w-full md:flex-1 pb-8 p-2 lg:p-5 lg:pt-0 lg:h-dvh lg:overflow-y-auto">
          <div className="bg-bg sticky top-0 z-1000">
            <NavBar />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default userSideBarLayout;
