import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export function ProtectedRoutes({ children }) {
    const user = useAuth()

    if (!user){
        return <Navigate to="/login" replace />;
    }

    return children;
}