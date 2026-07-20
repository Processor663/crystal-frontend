// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";


export default function ProtectedRoute() {
 //Logic goes here
 const authenticated = true

  if (!authenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}
