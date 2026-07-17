import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

//Pages
const Login = lazy(() => import("../pages/auth/LoginPage"));
const UserPage = lazy(() => import("../pages/userPage/userPage"));
import App_Spinner from "../shared/Spinner/Spinner";

//layout
import UserSideBarLayout from "../layouts/userSideBarLayout/userSideBarLayout";
import CastVotePage from "../pages/userPage/CastVotePage";

function AppRoute() {
  return (
    <>
      <Suspense fallback={<App_Spinner />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="me" element={<UserSideBarLayout />}>
            <Route index element={<UserPage />} />
            <Route path="vote" element={<CastVotePage />} />
          </Route>
        </Routes>
        
      </Suspense>
    
    </>
  );
}

export default AppRoute;
