const ADD_ITEM_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/items`;

export async function deleteBatchRequest(itemId,batchId) {
  const res = await fetch(`${ADD_ITEM_URL}/${itemId}/batches/${batchId}`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },

  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      data.message || data.error || "Failed to add item. Please try again.";
    throw new Error(message);
  }

  return data;
}
