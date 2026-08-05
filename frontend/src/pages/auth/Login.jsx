import AuthHero from "../../components/layout/AuthHero";
import LoginCard from "../../components/auth/LoginCard";

export default function Login() {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <AuthHero />
      </div>

      <div className="auth-right">
        <LoginCard />
      </div>
    </div>
  );
}