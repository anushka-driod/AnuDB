import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="login-form">
      <Input
        label="Email Address"
        placeholder="john@example.com"
        icon={<FiMail />}
      />

      <div style={{ position: "relative" }}>
        <Input
          label="Password"
          placeholder="Enter password"
          icon={<FiLock />}
          type={showPassword ? "text" : "password"}
        />

        <button
          type="button"
          className="eye-button"
          onClick={() =>
            setShowPassword(!showPassword)
          }
        >
          {showPassword ? (
            <FiEyeOff />
          ) : (
            <FiEye />
          )}
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
        Login to AnuDB
      </Button>
    </form>
  );
}