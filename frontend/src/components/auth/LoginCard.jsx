import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <div className="login-card">
      <h2>Welcome Back</h2>

      <p>Login to continue to your AnuDB workspace.</p>

      <LoginForm />
    </div>
  );
}