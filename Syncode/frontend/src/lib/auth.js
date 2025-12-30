export async function isAuthenticated() {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}
