import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { setAuth } from "../utils/auth";
import "./Login.css";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     setError("");
    //     try {
    //         setLoading(true);

    //         const data = await loginUser({ email, password });

    //         localStorage.setItem("token", data.token);
    //         localStorage.setItem("user", JSON.stringify(data.user));

    //         setAuth(data);

    //         if (data.user.role === "admin") {
    //             navigate("/adminpages/admin-dashboard");
    //         } else {
    //             navigate("/coachpages/coach-dashboard");
    //         }

    //     } catch (err) {
    //         setError(err.message || "Login failed. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = await loginUser({ email, password });

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            if (data.user.role === "admin") {
                navigate("/adminpages/admin-dashboard");
            } else {
                navigate("/coachpages/coach-dashboard");
            }

        } catch (err) {
            setError("Login failed");
        } finally {
            setLoading(false);
        }
       
    };
    

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Welcome Back 👋</h2>
                <p className="subtitle">Login to continue</p>

                {error && <div className="error-box">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className={`input-group ${email ? "filled" : ""}`}>
                        <input
                            type="email"
                            placeholder=" "
                            style={{ cursor: "pointer" }}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                    </div>

                    <div className={`input-group password-group ${password ? "filled" : ""}`}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder=" "
                            style={{ cursor: "pointer" }}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Password</label>

                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    <button className="loginbtn" type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;