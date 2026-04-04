import { getToken } from "../utils/auth";

const API_URL = "http://localhost:5000/api";

export const getProtectedData = async () => {
    const token = getToken();

    const res = await fetch(`${API_URL}/protected`, {
        headers: {
            Authorization: token,
        },
    });

    return res.json();
};