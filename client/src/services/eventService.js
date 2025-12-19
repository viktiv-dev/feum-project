const API_URL = "http://localhost:5000/api/events";

export async function getEvents() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) throw new Error("Failed to fetch events");
    console.log("All events:", data);
    return data || [];
  } catch (error) {
    console.error("getEvents error:", error);
    return [];
  }
}

export async function getEvent(id) {
  if (!id) throw new Error("Event ID is required");
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to fetch event with id ${id}`);
    }
    const data = await response.json();
    console.log("Single event:", data);
    return data || null;
  } catch (error) {
    console.error("getEvent error:", error);
    return null;
  }
}

export async function createEvent(eventData) {
  const formData = new FormData();
  formData.append("name", eventData.name);
  formData.append("lineup", eventData.lineup);
  formData.append("genre", eventData.genres);
  formData.append("description", eventData.description);
  formData.append("price", eventData.price);
  formData.append("location", eventData.location);
  formData.append("is_public", eventData.is_public);
  if (eventData.dateTime) formData.append("event_date", eventData.dateTime);
  if (eventData.image) formData.append("image", eventData.image);

  const response = await fetch(API_URL, { method: "POST", body: formData });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create event");
  }
  return await response.json();
}

export async function updateEvent(id, eventData) {
  try {
    const formData = new FormData();
    formData.append("name", eventData.name);
    formData.append("lineup", eventData.lineup);
    formData.append("genre", eventData.genres);
    formData.append("description", eventData.description);
    formData.append("price", eventData.price);
    formData.append("location", eventData.location);
    formData.append("is_public", eventData.is_public);
    if (eventData.dateTime) formData.append("event_date", eventData.dateTime);

    if (eventData.image instanceof File) {
      formData.append("image", eventData.image);
    } else if (eventData.picture_path) {
      formData.append("picture_path", eventData.picture_path);
    }

    const response = await fetch(`${API_URL}/${id}`, { method: "PATCH", body: formData });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to update event");
    }
    return await response.json();
  } catch (error) {
    console.error("updateEvent error:", error);
    throw error;
  }
}

export async function deleteEvent(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete event");
  return true;
}

// ===== New functions for past, future, and next events =====

export async function getSortedPastPublicEvents() {
  try {
    const response = await fetch(`${API_URL}/past/sorted`, { method: "GET" });
    const data = await response.json();
    console.log("Past events:", data);
    return data || [];
  } catch (error) {
    console.error("getSortedPastPublicEvents error:", error);
    return [];
  }
}

export async function getSortedFuturePublicEvents() {
  try {
    const response = await fetch(`${API_URL}/future/sorted`, { method: "GET" });
    const data = await response.json();
    console.log("Future events:", data);
    return data || [];
  } catch (error) {
    console.error("getSortedFuturePublicEvents error:", error);
    return [];
  }
}

export async function getNextPublicEvent() {
  try {
    const response = await fetch(`${API_URL}/next`, { method: "GET" });
    const data = await response.json();
    console.log("Next event:", data);
    return data || null;
  } catch (error) {
    console.error("getNextPublicEvent error:", error);
    return null;
  }
}
