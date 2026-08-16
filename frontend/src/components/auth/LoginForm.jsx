import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

import Input from "../ui/Input";
import Button from "../ui/Button";
import { login } from "../../services/authService";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      const data = response.data;

      if (data.success && data.user?.token) {
        localStorage.setItem("token", data.user.token);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user.user)
        );

        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Input
        label="Email Address"
        placeholder="john@example.com"
        icon={<FiMail />}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div style={{ position: "relative" }}>
        <Input
          label="Password"
          placeholder="Enter password"
          icon={<FiLock />}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="eye-button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      <div className="remember-row">
        <label>
          <input type="checkbox" />
          Remember me
        </label>

        <Link to="/forgot-password">
          Forgot Password?
        </Link>
      </div>

      <Button type="submit">
        {loading ? "Logging in..." : "Login to AnuDB"}
      </Button>
    </form>
  );
}