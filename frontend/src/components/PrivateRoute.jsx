import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

const PrivateRoute = ({ children, role }) => {
    const token = getToken();
    const role = getRole();
    const userRole = localStorage.getItem("role");

    // Not logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Role check
    if (role && role !== userRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;