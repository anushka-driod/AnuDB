export default function Button({
  children,
  type = "button",
  loading = false,
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="primary-button"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}