import { Navigate } from "react-router-dom";
import CastVote from "@/components/Vote/Vote/Vote";

const user = {
  role: "USER",
};

const CastVotePage = () => {
  // Implement this for admin
  if (user.role === "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <CastVote />;
};

export default CastVotePage;
