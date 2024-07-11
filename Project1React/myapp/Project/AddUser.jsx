import React, { useState } from "react";

const AddUserComp = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleCreate = () => {
    const newUser = {
      id: Date.now(), // Generate a unique id
      name,
      email,
      address: {}, // Placeholder for the user's address
    };
    onCreate(newUser);
  };

  return (
    <div>
      <h3>Add New User</h3>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default AddUserComp;