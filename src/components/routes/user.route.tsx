import {lazy, Suspense} from "react"
import { Routes, Route } from "react-router-dom";

//Pages
const Login = lazy(() => import("../pages/auth/LoginPage"));
const UserPage = lazy(() => import("../pages/userPage/userPage"));
import App_Spinner from "../shared/Spinner/Spinner";


//layout
import UserLayout from "../layouts/userLayout/userLayout";

function AppRoute() {
  return (
    <>
      <Suspense fallback={<App_Spinner />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="me" element={<UserLayout />}>
            <Route index element={<UserPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRoute;
