const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 border-transparent",
  secondary: "bg-white text-slate-800 border-slate-300 hover:bg-slate-50",
  dark: "bg-slate-900 text-white hover:bg-slate-800 border-transparent",
  subtle: "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200",
  outlinePrimary: "bg-white text-blue-600 border-blue-300 hover:bg-blue-50",
  outlineDanger: "bg-white text-red-600 border-red-300 hover:bg-red-50",
  danger: "bg-red-600 text-white hover:bg-red-700 border-transparent",
};

export default function Button({
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
  className = "",
  children,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-lg border px-3.5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}