const API_URL = "http://localhost:5000/api/bar/sales";

export async function getBarSales() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) throw new Error("Failed to fetch bar sales");
    return data || [];
  } catch (error) {
    console.error("getBarSales error:", error);
    return [];
  }
}

export async function getBarSalesByEvent(eventId) {
  try {
    const res = await fetch(`${API_URL}/event/${eventId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      // try to read message from server if available
      const text = await res.text().catch(() => null);
      throw new Error(text || `Failed to fetch bar sales for event ${eventId}`);
    }

    // try parse JSON safely
    let json = null;
    try {
      json = await res.json();
    } catch (e) {
      console.log(e)
      return [];
    }

    // normalize several common shapes to an array
    if (Array.isArray(json)) return json;
    if (json === null || typeof json !== "object") return [];
    if (Array.isArray(json.data)) return json.data;
    if (Array.isArray(json.rows)) return json.rows;
    if (Array.isArray(json.result)) return json.result;
    if (Array.isArray(json.body)) return json.body;

    // if the object has *any* array property, return that one (defensive)
    const firstArrayProp = Object.keys(json).find((k) => Array.isArray(json[k]));
    if (firstArrayProp) return json[firstArrayProp];

    // fallback — nothing useful found
    return [];
  } catch (err) {
    console.error("getBarSalesByEvent error:", err);
    return [];
  }
}


export async function getBarSale(id) {
  if (!id) throw new Error("Bar sale ID is required");
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to fetch bar sale with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error("getBarSale error:", error);
    return null;
  }
}

export async function createBarSale(data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create bar sale");
    }
    return await response.json();
  } catch (error) {
    console.error("createBarSale error:", error);
    throw error;
  }
}

export async function updateBarSale(id, data) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to update bar sale");
    }
    return await response.json();
  } catch (error) {
    console.error("updateBarSale error:", error);
    throw error;
  }
}

export async function deleteBarSale(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to delete bar sale");
  }
  return true;
}
