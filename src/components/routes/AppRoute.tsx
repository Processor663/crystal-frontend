import { Routes, Route } from "react-router-dom";

//Pages
import Login from "../pages/LoginPage";
import UserDashboard from "../UserDashboard/UserDashboard";

function AppRoute
() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="user" element={<UserDashboard/>} />
      </Routes>
    </>
  );
}

export default AppRoute
;
