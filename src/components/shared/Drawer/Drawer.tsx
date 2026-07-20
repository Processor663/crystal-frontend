import React, { useState } from "react";
import { Button, Drawer, ConfigProvider, theme } from "antd";

// icons
import { FaBarsStaggered } from "react-icons/fa6";
import { PiSignOutThin } from "react-icons/pi";

// Object
import { navItems } from "@/constants/navItems";

//components
import SideItem from "../SideBar/SideBarItem/SideBarItem";
// import SideBar from "../SideBar/SideBar/SideBar";

//Custom Hooks
import { useLogout } from "@/hooks/useLogout";

const App_Drawer: React.FC = () => {
  const logout = useLogout();

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorLink: " #6b7280",
            colorBgContainer: "#14171f",
            colorBorder: "#2c2942",
            colorText: " #6b7280",
            colorBorderDisabled: "true",
          },
          components: {
            Button: {
              controlHeight: 40,
              fontWeight: 600,
              colorPrimaryHover: "#ffffff",
            },
            Drawer: {
              colorBgElevated: "#14171f",
              colorIcon: "#6b7280",
            },
          },
        }}
      >
        <Button onClick={showDrawer}>
          <FaBarsStaggered />
        </Button>
        <Drawer
          closable={{ "aria-label": "Close Button", placement: "end" }}
          onClose={onClose}
          title={
            <div className="flex gap-3 items-center">
              <div className=" text-text rounded-full h-10 w-10 bg-accent flex items-center justify-center">
                AO
              </div>
              <div>
                <p>Welcome back, Adebayo</p>
                <p className="text-text"> Federal Election 2025</p>
              </div>
            </div>
          }
          open={open}
          styles={{
            header: {
              borderBottom: "none",
            },
            body: {
              padding: 0,
            },
          }}
        >
          <div className="border border-border pb-50">
            <SideItem navItems={navItems} onClose={onClose} />
          </div>
          <div className="flex gap-1 text-text items-center my-8 pl-3  transition-transform duration-200 hover:scale-105">
            <PiSignOutThin size="25" className="text-amber-500" />
            <button className="text-amber text-xs" onClick={logout}>
              Sign out
            </button>
          </div>

          <p className="flex gap-1  items-center pt-0 pl-3 ">
            &copy; {new Date().getFullYear()}{" "}
            <a href="mailto:miracleama17@gmail.com">Amadi Miracle .</a>
            All rights reserved.
          </p>
          <p className="flex gap-1 pl-3 ">
            Have a project in mind?{" "}
            <a
              href="mailto:miracleama17@gmail.com"
              className="font-medium text-accent hover:underline"
              style={{ color: "#8b7ff5" }}
            >
              Click here to get in touch.
            </a>
          </p>
        </Drawer>
      </ConfigProvider>
    </>
  );
};
export default App_Drawer;
