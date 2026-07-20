import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

//Pages
const Login = lazy(() => import("../pages/auth/LoginPage"));
const UserPage = lazy(() => import("../pages/userPage/UserPage"));
const CastVotePage = lazy(() => import("../pages/userPage/CastVotePage"));
const UserSettingsPage = lazy(
  () => import("../pages/userPage/UserSettingsPage"),
);
const ForgotPasswordPage = lazy(
  () => import("../pages/ForgotPasswordPage/ForgotPasswordPage"),
);

//Components
import App_Spinner from "../components/shared/Spinner/Spinner";

//Layouts
import UserSideBarLayout from "../layouts/UserSideBarLayout/UserSideBarLayout";

//Protected
import ProtectedRoute from "./ProtectedRoute";

function AppRoute() {
  return (
    <>
      <Suspense fallback={<App_Spinner />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="me" element={<UserSideBarLayout />}>
              <Route index element={<UserPage />} />
              <Route path="vote" element={<CastVotePage />} />
              <Route path="settings" element={<UserSettingsPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRoute;
