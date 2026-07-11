import type { IconType } from "react-icons";

export interface NavItem {
  desc: string;
  path: string;
  icon: IconType;
}

export interface SideItemProps {
  navItems: NavItem[];
}

export interface SideBarProps {
  navItems: NavItemProps[];
}
