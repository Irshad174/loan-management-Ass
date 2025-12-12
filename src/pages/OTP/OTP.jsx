import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../utils/storage";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import "./OTP.css";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const inputRefs = useRef([]);

  useEffect(() => {
    const pending = sessionStorage.getItem("lm_pending_auth");
    if (!pending) navigate("/login");
  }, []);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const otpArray = otp.split("");
    otpArray[index] = value;
    const newOtp = otpArray.join("");
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();

    if (otp.length < 6) {
      toast.error("Please enter complete 6-digit OTP");
      return;
    }

    const pending = JSON.parse(
      sessionStorage.getItem("lm_pending_auth") || "null"
    );

    if (!pending) {
      toast.error("No pending login");
      return;
    }

    const users = getUsers();
    const user = users.find((u) => u.id === pending.id);

    if (!user || user.otp !== otp) {
      toast.error("Invalid OTP");
      return;
    }

    login(user);
    sessionStorage.removeItem("lm_pending_auth");
    toast.success("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div className="otp-page">
      <div className="otp-card">
        <h2 className="otp-title">Verify OTP 🔐</h2>
        <p className="otp-subtitle">Please enter the 6-digit OTP</p>

        <form onSubmit={handleVerify}>
          <div className="otp-container">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                className="otp-input"
                value={otp[index] || ""}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <button type="submit" className="otp-btn">
            Verify OTP →
          </button>
        </form>
      </div>
    </div>
  );
}
