import React, { useState } from "react";

function AddTodoComp({ onAdd, onCancel }) {
  const [newTitle, setNewTitle] = useState("");

  const handleAdd = () => {
    if (newTitle.trim()) {
      onAdd(newTitle);
      setNewTitle("");
    }
  };

  return (
    <div style={{
      border: "1px solid gray",
      padding: "10px",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}>
      <input
        type="text"
        placeholder="Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default AddTodoComp;

