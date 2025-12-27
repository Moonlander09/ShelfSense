export async function getItemsByCategory(categoryId) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/items/category/${categoryId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data.message || data.error || "Failed to load items";
    throw new Error(message);
  }

  return data; // { status: "success", results: 5, data: [...] }
}