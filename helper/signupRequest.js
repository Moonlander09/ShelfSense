const SIGNUP_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`;

export async function signUpRequest(payload) {
  const res = await fetch(SIGNUP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      data.message || data.error || "Signup failed. Please try again.";
    throw new Error(message);
  }

  return data; // { status: "success", message: "Account created successfully!" }
}