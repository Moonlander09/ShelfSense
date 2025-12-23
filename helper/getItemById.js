export async function getItemById(id) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/items/${id}`;
  
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",  // sends JWT cookie
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data.message || data.error || "Failed to load items";
    throw new Error(message);
  }

  return data;  // { status: "success", results: 5, data: [items...] }
}
