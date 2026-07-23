import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import Dashboard from './pages/dashboard/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { isLoggedIn } from './services/auth'

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={isLoggedIn() ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={isLoggedIn() ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  )
}

export default App
