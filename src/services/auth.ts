export function isLoggedIn(): boolean {
  return localStorage.getItem("isLoggedIn") === "true"
}

export function login(): void {
  localStorage.setItem("isLoggedIn", "true")
}

export function logout(): void {
  localStorage.removeItem("isLoggedIn")
}
