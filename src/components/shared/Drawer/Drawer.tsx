import React, { useState } from "react";
import { Button, Drawer, ConfigProvider, theme } from "antd";

// icons
import { FaBarsStaggered } from "react-icons/fa6";

//components
import SideItem from "../SideBar/SideBarItem/SideBarItem";
import SideBar from "../SideBar/SideBar/SideBar";

// Object
import { navItems } from "@/components/layouts/userLayout/userLayout";

const App_Drawer: React.FC = () => {
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
          open={open}
          styles={{
            body: {
              padding: 0,
            },
          }}
        >
          {/* <div className="p-5">
            <div>
              <div>
                <p>Welcome back, Adebayo</p>
                <p className="text-text"> Federal Election 2025</p>
              </div>
            </div>
          </div> */}
          <SideBar navItems={navItems} />
        </Drawer>
      </ConfigProvider>
    </>
  );
};

export default App_Drawer;
