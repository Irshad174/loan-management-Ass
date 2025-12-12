import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUsers } from "../../utils/storage";
import { toast } from "react-toastify";
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        let tempErrors = {};

        if (!email) tempErrors.email = "Email is required";
        if (!password) tempErrors.password = "Password is required";

        setErrors(tempErrors);
        if (Object.keys(tempErrors).length > 0) return;

        const users = getUsers();
        const userFound = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!userFound) {
            toast.error("Invalid Email or Password");
            return;
        }

        sessionStorage.setItem(
            "lm_pending_auth",
            JSON.stringify({ id: userFound.id, email: userFound.email })
        );

        toast.success("Login successful. Please enter OTP.");
        navigate("/otp");
    };

    return (
        <div className="login-page">

            <div className="left-section">
                <div className="left-content-center">
                    <h1 className="welcome-title">Welcome</h1>

                    <p className="welcome-sub">Access your secure lending dashboard</p>

                    <p className="welcome-link">
                        Don’t have an account?
                        <Link to="/signup" className="link"> Sign up</Link>
                    </p>
                </div>
            </div>

            <div className="right-section">
                <div className="login-card">
                    <p className="login-subtitle">
                        Sign in to continue your secure lending experience
                    </p>

                    <form onSubmit={handleLogin} className="login-form">

                        <div className="form-group">
                            <label>Email <span className="required-star">*</span></label>
                            <input
                                type="email"
                                className="input"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>

                        <div className="form-group">
                            <label>Password <span className="required-star">*</span></label>
                            <input
                                className="input"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className="error-text">{errors.password}</p>}
                        </div>

                        <button type="submit" className="btn-login">LogIn</button>

                        <p className="bottom-text">
                            Don’t have an account?
                            <Link to="/signup" className="link"> Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
