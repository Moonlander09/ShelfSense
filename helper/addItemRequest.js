const ADD_ITEM_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/items`;

export async function addItemRequest(payload) {
  const res = await fetch(ADD_ITEM_URL, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      data.message || data.error || "Failed to add item. Please try again.";
    throw new Error(message);
  }

  // success: { status: "success", message: "Item added successfully to inventory" }
  return data;
}
