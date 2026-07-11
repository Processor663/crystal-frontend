import { Routes, Route } from "react-router-dom";

//Pages
import Login from "../pages/auth/LoginPage";
import UserPage from "../pages/userPage/userPage";

//layout
import UserLayout from "../layouts/userLayout/userLayout";

function AppRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="me" element={<UserLayout />}>
          <Route index element={<UserPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoute;
