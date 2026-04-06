import { useEffect, useState } from "react";
import { getProtectedData } from "../services/api";

const AdminDashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getProtectedData()
            .then(setData)
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default AdminDashboard;