import Logo from "../../Logo/Logo";
import AsideItem from "../SideBarItem/SideBarItem";

const AsideBar = () => {
  return (
    <div className="hidden md:block">
      <div className="my-10">
        <Logo />
      </div>
      <AsideItem />
    </div>
  );
};

export default AsideBar;
