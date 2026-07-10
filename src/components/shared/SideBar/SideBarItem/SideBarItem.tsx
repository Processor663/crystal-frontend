import { NavLink } from "react-router-dom";

//Icons
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaVoteYeaSolid } from "react-icons/lia";
import { BsActivity } from "react-icons/bs";



const AsideItem = () => {
  return (
    <div className="border-border border border-l-0 py-5">
      <NavLink to="">
        {({ isActive }) => (
          <div
            className={
              isActive
                ? "flex items-center gap-1 border-l-purple border-l-3 hover:bg-surface2 pl-2 p-3 bg-active-link text-[#fff]"
                : "bg-transparent hover:bg-surface2"
            }
          >
            <small>
              <LuLayoutDashboard />
            </small>
            <small>Dashboard</small>
          </div>
        )}
      </NavLink>
      <NavLink to="vote">
        {({ isActive }) => (
          <div
            className={
              isActive
                ? "flex items-center gap-1 border-l-4 hover:bg-surface2 border-l-purple pl-2 p-3 bg-active-link text-white"
                : "flex items-center gap-1 pl-2 p-3 hover:bg-surface2"
            }
          >
            <small>
              <LiaVoteYeaSolid />
            </small>
            <small>Cast Vote</small>
          </div>
        )}
      </NavLink>
      <NavLink to="live">
        {({ isActive }) => (
          <div
            className={
              isActive
                ? "flex items-center gap-1 border-l-4 hover:bg-surface2 border-l-purple pl-2 p-3 bg-active-link text-white"
                : "flex items-center gap-1 pl-2 p-3 hover:bg-surface2"
            }
          >
            <small>
              <BsActivity />
            </small>
            <small>Live</small>
          </div>
        )}
      </NavLink>
    </div>
  );
};

export default AsideItem;
