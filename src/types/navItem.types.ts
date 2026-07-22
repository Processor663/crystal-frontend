import type { IconType } from "react-icons";

export interface NavItemProps {
  desc: string;
  path: string;
  icon: IconType;
}

export interface SideItemProps {
  navItems: NavItemProps[];
  onClose: ()=> void;
}

export interface SideBarProps {
  navItems: NavItemProps[];
  // onClose: () => void;
}
