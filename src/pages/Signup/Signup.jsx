import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, saveUsers } from "../../utils/storage";
import { toast } from "react-toastify";
import "./Signup.css";

export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        city: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const updateField = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const isStrongPassword = (password) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;
        return regex.test(password);
    };

    const handleSignup = (e) => {
        e.preventDefault();

        let temp = {};

        if (!form.name) temp.name = "Full Name is required";
        if (!form.email) temp.email = "Email is required";

        if (!form.password)
            temp.password = "Password is required";
        else if (!isStrongPassword(form.password))
            temp.password = "Weak password! Use 8 chars, uppercase, number, special.";

        if (!form.phone) temp.phone = "Phone number required";
        if (!form.city) temp.city = "City is required";

        setErrors(temp);
        if (Object.keys(temp).length > 0) return;

        const users = getUsers();
        if (users.some((u) => u.email === form.email)) {
            toast.error("Email already exists");
            return;
        }

        const newUser = {
            id: users.length + 1,
            otp: "111222",
            ...form,
        };

        users.push(newUser);
        saveUsers(users);

        toast.success("Signup successful! Please login.");
        navigate("/login");
    };

    return (
        <div className="signup-page">
            <div className="left-section">
                <div className="left-content-center">
                    <h1 className="welcome-title">Join Us</h1>
                    <p className="welcome-sub">
                        Create your secure lending account in a few simple steps
                    </p>
                </div>
            </div>

            <div className="right-section">
                <div className="signup-card">

                    <h2 className="signup-title">Create Your Account</h2>
                    <p className="signup-subtitle">Join to access the loan dashboard</p>

                    <form onSubmit={handleSignup} className="signup-form">

                        <div className="form-group">
                            <label>Full Name <span className="required-star">*</span></label>
                            <input
                                className="input"
                                placeholder="Name"
                                value={form.name}
                                onChange={(e) => updateField("name", e.target.value)}
                            />
                            {errors.name && <p className="error-text">{errors.name}</p>}
                        </div>

                        <div className="form-group">
                            <label>Email <span className="required-star">*</span></label>
                            <input
                                className="input"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => updateField("email", e.target.value)}
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>

                        <div className="form-group">
                            <label>Password <span className="required-star">*</span></label>
                            <input
                                className="input"
                                type="password"
                                placeholder="password"
                                value={form.password}
                                onChange={(e) => updateField("password", e.target.value)}
                            />
                            {errors.password && <p className="error-text">{errors.password}</p>}
                        </div>

                        <div className="form-group">
                            <label>Phone Number <span className="required-star">*</span></label>
                            <input
                                className="input"
                                placeholder="Phone Number"
                                maxLength={10}
                                value={form.phone}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    if (/^\d*$/.test(v)) updateField("phone", v);
                                }}
                            />
                            {errors.phone && <p className="error-text">{errors.phone}</p>}
                        </div>

                        <div className="form-group">
                            <label>City <span className="required-star">*</span></label>
                            <input
                                className="input"
                                placeholder="City"
                                value={form.city}
                                onChange={(e) => updateField("city", e.target.value)}
                            />
                            {errors.city && <p className="error-text">{errors.city}</p>}
                        </div>

                        <button type="submit" className="btn-signup">Create Account</button>

                        <p className="bottom-text">
                            Already have account?
                            <span className="login-link" onClick={() => navigate("/login")}>
                                Login
                            </span>
                        </p>
                    </form>

                </div>
            </div>

        </div>
    );
}
