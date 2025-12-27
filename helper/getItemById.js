export async function getItemById(id) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/items/${id}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data.message || data.error || "Failed to load item";
    throw new Error(message);
  }

  return data; // { status: "success", data: {...} }
}