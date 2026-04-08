export const getToken = () => localStorage.getItem("token");

export const getRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.role;
};

export const setAuth = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
};

export const logout = () => {
    localStorage.clear();
};