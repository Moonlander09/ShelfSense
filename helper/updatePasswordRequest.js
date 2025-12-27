const UPDATEPASSWORD_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/updatepassword`;

export async function updatePasswordRequest(payload) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(UPDATEPASSWORD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      data.message ||
      data.error ||
      "Failed to update password. Please try again.";
    throw new Error(message);
  }

  // ✅ IMPORTANT: backend sends a new token after password update
  if (data.token) {
    localStorage.setItem("accessToken", data.token);
  }

  return data;
}