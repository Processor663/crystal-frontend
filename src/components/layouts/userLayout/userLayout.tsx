import { Outlet } from "react-router-dom";

//components
import SideBar from "@/components/shared/SideBar/SideBar/SideBar";


//Icons
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaVoteYeaSolid } from "react-icons/lia";
import { BsActivity } from "react-icons/bs";


const navItems = [
  {
    desc: "Dashboard",
    path: "",
    icon: LuLayoutDashboard,
  },
  {
    desc: "Cast Vote",
    path: "vote",
    icon: LiaVoteYeaSolid,
  },
  {
    desc: "Live",
    path: "live",
    icon: BsActivity,
  },
];


function userLayout() {
  return (
    <>
      <div className="flex">
        <div className="w-[18%]  bg-surface">
          <SideBar navItems={navItems} />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default userLayout;
