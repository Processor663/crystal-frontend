import { Navigate } from "react-router-dom";
import CastVote from "@/components/Vote/Vote/Vote";

//Hooks
import { useAuthUser } from "@/hooks/useAuthUser";

const CastVotePage = () => {
  const { role } = useAuthUser();
  // Implement this for admin
  if (role === "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <CastVote />;
};

export default CastVotePage;
