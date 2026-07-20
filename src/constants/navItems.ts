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
    path: "live-scores",
    icon: BsActivity,
  },
  {
    desc: "Settings",
    path: "settings",
    icon: MdSettings,
  },
];
