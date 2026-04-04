export const getToken = () => localStorage.getItem("token");
export const getRole = () => localStorage.getItem("role");

export const setAuth = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
};

export const logout = () => {
    localStorage.clear();
};