const SIGNOUT_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signout`;

export async function signOutRequest() {
  const res = await fetch(SIGNOUT_URL, {
    method: "GET",  // or DELETE, whatever your backend expects
    credentials: "include",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Signout failed");
  }

  return res.json();
}
