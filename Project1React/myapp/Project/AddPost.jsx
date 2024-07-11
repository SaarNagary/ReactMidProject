import React, { useState } from "react";

function AddPostComp({ onAdd, onCancel }) {
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  const handleAdd = () => {
    if (newTitle.trim() && newBody.trim()) {
      onAdd(newTitle, newBody);
      setNewTitle("");
      setNewBody("");
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
      <textarea
        placeholder="Body"
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
      />
      <div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default AddPostComp;
