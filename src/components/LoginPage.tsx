import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

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

        <div className="field">
          <label className="field-label">Email</label>
          <input
            className="field-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="field-label">Password</label>
          <div className="field-input-wrapper">
            <input
              className="field-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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

        <button className="login-btn">Log in</button>
      </div>

    </div>
  )
}

export default LoginPage
