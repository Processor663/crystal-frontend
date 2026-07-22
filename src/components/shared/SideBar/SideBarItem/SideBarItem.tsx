import { NavLink } from "react-router-dom";

// Types
import type { SideItemProps } from "@/types/navItem.types";

const SideItem = ({ navItems, onClose }: SideItemProps) => {
  console.log(navItems);
  return (
    <div className=" lg:border-border lg:border border-l-0 py-5 pb-10 lg:pb-0 ">
      {navItems.map(({ desc, path, icon: Icon }) => (
        <NavLink key={desc} to={path} end={path === ""} onClick={onClose}>
          {({ isActive }) => (
            <div
              className={`flex items-center gap-2 p-3 ${
                isActive
                  ? " text-white flex items-center gap-1 border-l-purple border-l-3 mb-1 pl-2 p-3 bg-active-link "
                  : "bg-transparent hover:bg-surface2"
              }`}
            >
              <Icon />
              <p>{desc}</p>
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default SideItem;
