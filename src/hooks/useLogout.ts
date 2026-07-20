import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

   const logout = () => {

    //Logic goes here
    // ===============================
    navigate("/", { replace: true });
   };

   return logout;
}
