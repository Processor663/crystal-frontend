import { useLocation, Link } from "react-router-dom";
import App_Drawer from "@/components/shared/Drawer/Drawer";

import { motion } from "framer-motion";

const NavBar = () => {
  const { pathname } = useLocation();
  return (
    <>
      <div className="mt-2.5 lg:mt-0 lg:py-4">
        <h1 className="text-text hidden lg:block ">
          {pathname.includes("vote") ? "Cast Your Vote" : "Dashboard"}
        </h1>

        <div className="flex justify-between align-center">
          {/* Mobile Navbar */}
          <div className="lg:hidden">
            <App_Drawer />
          </div>
          <div className="">
            <div>
              <div>
                <p>Welcome back, Adebayo</p>
                <div className="overflow-hidden whitespace-nowrap w-35 md:w-70">
                  <motion.div
                    className="flex w-max"
                    animate={{ x: ["30%", "-100%"] }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "linear",
                    }}
                  >
                    <p className="text-text">
                  
                   
                    SUG Election 2025
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          <div className="sub">
            <div className="text-text hidden lg:block"></div>
          </div>
          <div className="flex gap-2 items-center">
            {" "}
            <div className="bg-[rgba(34, 197, 94, 0.1)] rounded-2xl px-3 py-1 text-green font-mono text-[0.75rem] border border-[rgba(34, 197, 94, 0.25)]">
              <span className="inline-block w-[7px] h-[7px] rounded-full bg-green animate-[pulse_1s_infinite] mr-1"></span>
              Voting Open
            </div>
            {!pathname.includes("vote") && (
              <Link
                to="vote"
                className="hidden lg:block bg-purple rounded-2xl text-text text-[0.75rem] px-3 py-1"
              >
                Cast Your Vote
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
