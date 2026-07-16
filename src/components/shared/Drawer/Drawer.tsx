import React, { useState } from "react";
import { Button, Drawer, ConfigProvider, theme } from "antd";

// icons
import { FaBarsStaggered } from "react-icons/fa6";
import { PiSignOutThin } from "react-icons/pi";

//components
import SideItem from "../SideBar/SideBarItem/SideBarItem";
// import SideBar from "../SideBar/SideBar/SideBar";

// Object
import { navItems } from "@/components/layouts/userLayout/userLayout";
import Logo from "../Logo/Logo";

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
            <div className="">
              <div className="flex gap-3 items-center">
                <div className=" text-text rounded-full h-10 w-10 bg-accent flex items-center justify-center">
                  AO
                </div>
                <div>
                  <p>Welcome back, Adebayo</p>
                  <p className="text-text"> Federal Election 2025</p>
                </div>
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
            <SideItem navItems={navItems} />
          </div>
          {/* <div className="mt-20 hidden">
            <Logo />
          </div> */}
          <div className="flex gap-1 text-text items-center my-8 pl-3  transition-transform duration-200 hover:scale-105">
            <PiSignOutThin size="25" className="text-amber-500" />
            <small className="text-amber-500 text-[.8rem]">Sign out</small>
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

// import { useState } from "react";
// import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
// import {
//   MdDashboard,
//   MdHowToVote,
//   MdSettings,
//   MdPeople,
//   MdSecurity,
// } from "react-icons/md";

// const NAV_LINKS = [
//   { label: "Dashboard", icon: MdDashboard, href: "#dashboard" },
//   { label: "Vote", icon: MdHowToVote, href: "#vote" },
//   { label: "Candidates", icon: MdPeople, href: "#candidates" },
//   { label: "Results", icon: MdSecurity, href: "#results" },
//   { label: "Settings", icon: MdSettings, href: "#settings" },
// ];

// export default function App_Drawer() {
//   const [open, setOpen] = useState(false);
//   const [active, setActive] = useState("Dashboard");

//   return (
//     <div className="min-h-screen w-full bg-[#0D0F14] text-white font-sans">
//       {/* Top bar */}
//       <header className="flex items-center justify-between px-4 py-4 border-b border-white/5">
//         <div className="flex items-center gap-2">
//           <div className="h-7 w-7 rounded-md bg-[#7C6AF4]/20 flex items-center justify-center">
//             <MdSecurity size={16} className="text-[#7C6AF4]" />
//           </div>
//           <span className="text-sm font-medium tracking-wide">CrystalVote</span>
//         </div>

//         <button
//           onClick={() => setOpen(true)}
//           aria-label="Open menu"
//           className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors"
//         >
//           <FiMenu size={22} />
//         </button>
//       </header>

//       {/* Placeholder page content */}
//       <main className="p-4 text-white/40 text-sm">
//         Tap the menu icon to open the mobile nav.
//       </main>

//       {/* Overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Drawer */}
//       <aside
//         className={`fixed top-0 right-0 z-50 h-full w-[78%] max-w-xs bg-[#12141B] border-l border-white/5 flex flex-col transition-transform duration-300 ease-out ${
//           open ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Drawer header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
//           <div className="flex items-center gap-2">
//             <div className="h-8 w-8 rounded-full bg-[#7C6AF4]/20 flex items-center justify-center text-xs font-medium text-[#AFA9EC]">
//               AM
//             </div>

//             <div>
//               <p className="text-sm font-medium leading-tight">Amadi Miracle</p>
//               <p className="text-xs text-white/40 leading-tight">
//                 Verified voter
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={() => setOpen(false)}
//             aria-label="Close menu"
//             className="p-2 rounded-md text-white/50 hover:text-white hover:bg-white/5 transition-colors"
//           >
//             <FiX size={20} />
//           </button>
//         </div>

//         {/* Nav links */}
//         <nav className="flex-1 overflow-y-auto px-3 py-4">
//           <ul className="space-y-1">
//             {NAV_LINKS.map(({ label, icon: Icon, href }) => {
//               const isActive = active === label;

//               return (
//                 <li key={label}>
//                   <a
//                     href={href}
//                     onClick={() => setActive(label)}
//                     className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
//                       isActive
//                         ? "bg-[#7C6AF4]/15 text-[#AFA9EC] font-medium"
//                         : "text-white/60 hover:text-white hover:bg-white/5"
//                     }`}
//                   >
//                     <Icon size={18} />
//                     {label}
//                   </a>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Footer */}
//         <div className="border-t border-white/5 px-3 py-4 space-y-1">
//           <a
//             href="#help"
//             className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
//           >
//             Help and support
//           </a>

//           <button
//             onClick={() => console.log("sign out")}
//             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#F0997B] hover:bg-[#F0997B]/10 transition-colors"
//           >
//             <FiLogOut size={18} />
//             Sign out
//           </button>

//           <p className="px-3 pt-2 text-[11px] text-white/25">
//             CrystalVote v1.0
//           </p>
//         </div>
//       </aside>
//     </div>
//   );
// }
