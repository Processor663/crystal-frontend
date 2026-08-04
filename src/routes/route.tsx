import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

//Pages
const Login = lazy(() => import("../pages/auth/LoginPage"));
const UserPage = lazy(() => import("../pages/DashboardPage"));
const CastVotePage = lazy(() => import("../pages/CastVotePage"));
const UserSettingsPage = lazy(
  () => import("../pages/SettingsPage"),
);
const ForgotPasswordPage = lazy(
  () => import("../pages/ForgotPasswordPage"),
);
const NotFound = lazy(() => import("../pages/NotFound"));
const LiveScoresPage = lazy(() => import("@/pages/LiveScoresPage"));

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
              <Route path="live-scores" element={<LiveScoresPage />} />
              <Route path="settings" element={<UserSettingsPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
            </Route>
          </Route>
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRoute;
