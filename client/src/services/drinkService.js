const API_URL = "http://localhost:5000/api/bar/drinks";

export async function getDrinks() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) throw new Error("Failed to fetch drinks");
    return data || [];
  } catch (error) {
    console.error("getDrinks error:", error);
    return [];
  }
}

export async function getDrink(id) {
  if (!id) throw new Error("Drink ID is required");
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to fetch drink with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error("getDrink error:", error);
    return null;
  }
}

export async function createDrink(drinkData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(drinkData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create drink");
    }
    return await response.json();
  } catch (error) {
    console.error("createDrink error:", error);
    throw error;
  }
}

export async function updateDrink(id, drinkData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(drinkData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to update drink");
    }
    return await response.json();
  } catch (error) {
    console.error("updateDrink error:", error);
    throw error;
  }
}

export async function deleteDrink(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to delete drink");
  }
  return true;
}
