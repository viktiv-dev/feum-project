import React, { useState } from "react";
import InventoryListPanel from "./InventoryListPanel";
import InventoryFormPanel from "./InventoryFormPanel";

export default function InventoryPanel() {
  const [mode, setMode] = useState("list"); // list | create | edit | view
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleAdd = () => {
    setSelectedEvent(null);
    setMode("create");
  };

  const handleEdit = (event) => {
    console.debug("InventoryPanel.handleEdit got:", event);
    setSelectedEvent(event); // { eventId, eventName }
    setMode("edit");
  };

  const handleView = (event) => {
    console.debug("InventoryPanel.handleView got:", event);
    setSelectedEvent(event);
    setMode("view");
  };

  const handleBack = () => {
    setSelectedEvent(null);
    setMode("list");
  };

  return (
    <>
      {mode === "list" && (
        <InventoryListPanel
          onAdd={handleAdd}
          onEdit={handleEdit}
          onView={handleView}
        />
      )}

      {mode !== "list" && (
        <InventoryFormPanel
          mode={mode}
          eventId={selectedEvent?.eventId ?? null}
          eventName={selectedEvent?.eventName ?? null}
          onBack={handleBack}
        />
      )}
    </>
  );
}
