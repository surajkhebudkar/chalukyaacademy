const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (userData) => {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.msg);

    return data;
};