const API_URL = "http://localhost:5000/api/bar/inventories";

export async function getInventories() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) throw new Error("Failed to fetch inventories");
    return data || [];
  } catch (error) {
    console.error("getInventories error:", error);
    return [];
  }
}

export async function getInventory(id) {
  if (!id) throw new Error("Inventory ID is required");
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to fetch inventory with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error("getInventory error:", error);
    return null;
  }
}

export async function createInventory(data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create inventory");
    }
    return await response.json();
  } catch (error) {
    console.error("createInventory error:", error);
    throw error;
  }
}

export async function updateInventory(id, data) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to update inventory");
    }
    return await response.json();
  } catch (error) {
    console.error("updateInventory error:", error);
    throw error;
  }
}

export async function deleteInventory(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to delete inventory");
  }
  return true;
}

export async function deleteInventoryByEvent(eventId) {
  try {
    const res = await fetch(`${API_URL}/event/${eventId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete inventory for event");
    return true;
  } catch (err) {
    console.error("deleteInventoryByEvent error:", err);
    throw err;
  }
}

export async function getInventoryByEvent(eventId) {
  try {
    const res = await fetch(`${API_URL}/event/${eventId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch crew");
    }
    return await res.json();
  } catch (err) {
    console.error("getCrewByEvent error:", err);
    return [];
  }
}

export async function bulkSaveInventoryWithBarSales(
  eventId,
  inventoryRows = [],
  barSales = []
) {
  if (!eventId) throw new Error("Event ID is required for bulk save");

  try {
    const response = await fetch(`${API_URL}/bulk/save-with-bar-sales`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: eventId,
        inventoryRows,
        barSales,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        errorText || "Failed to bulk save inventory and bar sales"
      );
    }

    return await response.json();
  } catch (err) {
    console.error("bulkSaveInventoryWithBarSales error:", err);
    throw err;
  }
}

export async function getInventoryByEventName(eventName) {
  const encoded = encodeURIComponent(eventName);
  const res = await fetch(`/api/inventories/event/name/${encoded}`);
  if (!res.ok) throw new Error("Failed to fetch inventory");
  return res.json();
}
