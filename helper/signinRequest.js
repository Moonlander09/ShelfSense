const SIGNIN_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`;

export async function signInRequest(payload) {
  const res = await fetch(SIGNIN_URL, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // Try to parse JSON (works for both success and AppError)
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Backend sent an error status (400/401/etc.)
    const message =
      data.message || data.error || "Signin failed. Please try again.";
    throw new Error(message);
  }

  // Success (200)
  return data; // { status: "success", message: "...", maybe later user, etc. }
}
