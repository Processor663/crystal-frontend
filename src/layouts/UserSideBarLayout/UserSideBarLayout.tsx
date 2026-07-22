import { Outlet, useLocation } from "react-router-dom";

//components
import SideBar from "@/components/shared/SideBar/SideBar/SideBar";
import NavBar from "@/components/shared/NavBar/NavBar";

// Object
import { navItems } from "@/constants/navItems";

function UserSideBarLayout() {
  const { pathname } = useLocation();
  const navHidden =
    pathname.includes("settings") || pathname.includes("forgot-password")
      ? "hidden bg-bg sticky top-0 z-1000"
      : "bg-bg sticky top-0 z-1000";

  const sideBarHidden = pathname.includes("forgot-password")
    ? "hidden lg:block w-[18%]  bg-surface lg:hidden"
    : "hidden lg:block w-[18%]  bg-surface";
  return (
    <>
      <div className="flex overflow-hidden">
        <div className={`${sideBarHidden}`}>
          <SideBar navItems={navItems} />
        </div>
        <div className="w-full  bg-amber md:flex-1 pb-8 p-2 lg:p-5 lg:pt-0 min-h-dvh lg:overflow-y-auto">
          <div className={`${navHidden}`}>
            <NavBar />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default UserSideBarLayout;
