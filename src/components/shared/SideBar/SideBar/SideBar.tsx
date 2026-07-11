import Logo from "../../Logo/Logo";
import SideItem from "../SideBarItem/SideBarItem";

// types
import  type{SideBarProps} from "@/components/types/navItem.types"



const SideBar = (props: SideBarProps) => {
  return (
    <div className="hidden md:block">
      <div className="my-10">
        <Logo />
      </div>
      <SideItem {...props} />
    </div>
  );
};

export default SideBar;
