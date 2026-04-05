import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../utils/auth";

const PrivateRoute = ({ children, role }) => {
    const token = getToken();
    const userRole = getRole();

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