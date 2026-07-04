import { useState } from 'react'
import { Eye, EyeOff, AlertTriangle } from 'lucide-react'

const FAKE_USER = { email: "test@example.com", password: "password123" }

async function fakeLogin(email: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (email !== FAKE_USER.email) {
    return { error: "email_not_found" }
  }
  if (password !== FAKE_USER.password) {
    return { error: "wrong_password" }
  }
  return { error: null }
}

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [serverError, setServerError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit() {
    const newErrors = { email: "", password: "" }

    if (email === "") {
      newErrors.email = "This field is required."
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address."
    }

    if (password === "") {
      newErrors.password = "This field is required."
    }

    setErrors(newErrors)

    const hasClientErrors = newErrors.email !== "" || newErrors.password !== ""
    if (hasClientErrors) return

    setIsLoading(true)
    setServerError("")

    const result = await fakeLogin(email, password)

    setIsLoading(false)

    if (result.error === "email_not_found") {
      setErrors({ ...newErrors, email: "No account found." })
      setServerError("No account found with this email address.")
    } else if (result.error === "wrong_password") {
      setErrors({ ...newErrors, password: "Incorrect password." })
      setServerError("Incorrect password. Please try again.")
    } else {
      alert("Login successful!")
    }
  }

  return (
    <div className="login-page">

      <div className="login-left">
        <div className="login-logo">🌿</div>
        <h1 className="login-brand">FitTrack</h1>
        <p className="login-tagline">
          Track nutrition, weight, exercise &amp; hydration — all in one place.
        </p>
      </div>

      <div className="login-right">
        <h2 className="login-title">Welcome back</h2>

        {serverError && (
          <div className="error-banner">
            <AlertTriangle size={14} />
            <span>{serverError}</span>
          </div>
        )}

        <div className="field">
          <label className="field-label">Email</label>
          <input
            className={`field-input ${errors.email ? "field-input--error" : ""}`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="field">
          <label className="field-label">Password</label>
          <div className="field-input-wrapper">
            <input
              className={`field-input ${errors.password ? "field-input--error" : ""}`}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div style={{ fontSize: '12px', color: 'gray', marginBottom: '8px' }}>
          DEBUG — email: {email} | password: {password}
        </div>

        <div className="forgot-password">Forgot password?</div>

        <button
          className={`login-btn ${serverError ? "login-btn--error" : ""}`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </div>

    </div>
  )
}

export default LoginPage
