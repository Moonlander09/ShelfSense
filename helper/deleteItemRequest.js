const ADD_ITEM_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/items`;

export async function deleteItemRequest(itemId) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${ADD_ITEM_URL}/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      data.message || data.error || "Failed to delete item. Please try again.";
    throw new Error(message);
  }

  return data;
}