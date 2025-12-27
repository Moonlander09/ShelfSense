const SIGNIN_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`;

export async function signInRequest(payload) {
  const res = await fetch(SIGNIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      data.message || data.error || "Signin failed. Please try again.";
    throw new Error(message);
  }

  // ✅ NEW: store token
  if (data.token) {
    localStorage.setItem("accessToken", data.token);
  }

  return data;
}