const CREW_API = "http://localhost:5000/api/crew";

export async function getCrewByEvent(eventId) {
  try {
    const res = await fetch(`${CREW_API}/event/${eventId}`, {
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

export async function addCrew(eventId, crewList) {
  try {
    const res = await fetch(`${CREW_API}/event/${eventId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crewList),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to add crew");
    }
    return await res.json();
  } catch (err) {
    console.error("addCrew error:", err);
    throw err;
  }
}

export async function updateCrew(id, data) {
  try {
    const res = await fetch(`${CREW_API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to update crew");
    }
    return await res.json();
  } catch (err) {
    console.error("updateCrew error:", err);
    throw err;
  }
}

export async function deleteCrew(id) {
  try {
    const res = await fetch(`${CREW_API}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete crew");
    }
    return true;
  } catch (err) {
    console.error("deleteCrew error:", err);
    throw err;
  }
}

export async function deleteCrewByEvent(eventId) {
  try {
    const res = await fetch(`${CREW_API}/event/${eventId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete crew for event");
    return true;
  } catch (err) {
    console.error("deleteCrewByEvent error:", err);
    throw err;
  }
}
