const API_URL = "http://localhost:5000/api/bar/products";

export async function getProducts() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return data || [];
  } catch (error) {
    console.error("getProducts error:", error);
    return [];
  }
}

export async function getProduct(id) {
  if (!id) throw new Error("Product ID is required");

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to fetch product with id ${id}`);
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("getProduct error:", error);
    return null;
  }
}

export async function createProduct(productData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create product");
    }

    return await response.json();
  } catch (error) {
    console.error("createProduct error:", error);
    throw error;
  }
}

export async function updateProduct(id, productData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to update product");
    }

    return await response.json();
  } catch (error) {
    console.error("updateProduct error:", error);
    throw error;
  }
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to delete product");
  }
  return true;
}
