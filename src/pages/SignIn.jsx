import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { Button, DemoNotice, Field, fieldProps } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import usePageMeta from "../hooks/usePageMeta";

export default function SignIn() {
  usePageMeta("Sign In");
  const navigate = useNavigate();
  const { signIn, createAccount } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mode === "signup" && !name.trim())
      return setError("Please enter your name.");
    const result =
      mode === "signup"
        ? createAccount(name, email, password)
        : signIn(email, password);
    if (!result.ok) return setError(result.error);
    navigate(result.user.role === "admin" ? "/admin" : "/booking");
  };

  return (
    <section className="min-h-[72vh] bg-beige pb-20 pt-32">
      <div className="mx-auto max-w-md px-5">
        <div className="border border-sand bg-white p-7 shadow-sm sm:p-10">
          <p className="eyebrow mb-3">Aurelia account</p>
          <h1 className="text-4xl">
            {mode === "signin" ? "Welcome back" : "Create account"}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
            {mode === "signin"
              ? "Sign in to manage your reservations."
              : "Create an account to keep track of your reservations."}
          </p>
          <div className="mt-7 grid grid-cols-2 border-b border-sand">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setError("");
              }}
              className={`pb-3 text-xs uppercase tracking-[0.16em] ${mode === "signin" ? "border-b-2 border-gold text-charcoal" : "text-charcoal/45"}`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError("");
              }}
              className={`pb-3 text-xs uppercase tracking-[0.16em] ${mode === "signup" ? "border-b-2 border-gold text-charcoal" : "text-charcoal/45"}`}
            >
              Create account
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            {mode === "signup" && (
              <Field
                label="Full name"
                id="name"
                error={error && mode === "signup" && !name.trim() ? error : ""}
              >
                <input
                  {...fieldProps(
                    "name",
                    error && mode === "signup" && !name.trim(),
                  )}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  className="input"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </Field>
            )}
            <Field
              label="Email address"
              id="email"
              error={error && !email ? error : ""}
            >
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
                />
                <input
                  {...fieldProps("email", error && !email)}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="input pl-11"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </Field>
            <Field
              label="Password"
              id="password"
              error={error && email && password.length < 6 ? error : ""}
            >
              <div className="relative">
                <LockKeyhole
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
                />
                <input
                  {...fieldProps("password", error && email && !password)}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="input px-11"
                  placeholder="At least 6 characters"
                  autoComplete={
                    mode === "signin" ? "current-password" : "new-password"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((show) => !show)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/45 hover:text-charcoal"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>
            {error && (
              <p role="alert" className="text-sm text-red-700">
                {error}
              </p>
            )}
            {mode === "signin" && (
              <button
                type="button"
                onClick={() =>
                  setError("Password reset is not connected in this demo.")
                }
                className="block text-xs text-charcoal/60 hover:text-gold-dark"
              >
                Forgot password?
              </button>
            )}
            <Button type="submit" className="w-full">
              {mode === "signin" ? "Sign In" : "Create Account"}
            </Button>
          </form>
          <DemoNotice className="mt-6">
            Account details are stored only in this browser for this
            demonstration.
          </DemoNotice>
          <p className="mt-6 text-center text-sm text-charcoal/60">
            <Link to="/" className="hover:text-gold-dark">
              Return to the website
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
