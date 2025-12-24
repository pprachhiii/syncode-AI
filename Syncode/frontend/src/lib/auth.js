export async function isAuthenticated() {
  try {
    const res = await fetch("http://localhost:5000/api/me", {
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}
