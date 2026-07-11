import { NavLink } from "react-router-dom";

// Types
import type { SideItemProps } from "@/components/types/navItem.types";

const SideItem = ({ navItems }: SideItemProps) => {
  console.log(navItems);
  return (
    <div className="border-border border border-l-0 py-5">
      {navItems.map(({ desc, path, icon: Icon }) => (
        <NavLink key={desc} to={path}>
          {({ isActive }) => (
            <div
              className={`flex items-center gap-2 p-3 ${
                isActive
                  ? " text-white flex items-center gap-1 border-l-purple border-l-3 mb-1 pl-2 p-3 bg-active-link "
                  : "bg-transparent hover:bg-surface2"
              }`}
            >
              <Icon />
              <span>{desc}</span>
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default SideItem;
