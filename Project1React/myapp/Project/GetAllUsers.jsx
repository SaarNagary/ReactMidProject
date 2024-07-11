import React, { useEffect, useRef, useState } from "react";
import { getAll } from "../src/utils";
import UserComp from "./User";
import IdClickComp from "./IdClick";
import AddUserComp from "./AddUser";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const GetAllUsersComp = ({ tasks, setTasks, posts, setPosts }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, SetSelectedUserId] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [userBorderColors, setUserBorderColors] = useState({});
  const todoDataRef = useRef(new Map());
  const postDataRef = useRef(new Map());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAll(USERS_URL);
        setUsers(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchData();
  }, []);

  // Function to handle changes in the search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleShowTasks = (userId) => {
    SetSelectedUserId(userId);
  };

  const handleAllTasksCompleted = (userId) => {
    setUserBorderColors((prevColors) => ({
      ...prevColors,
      [userId]: "green",
    }));
  };

  const handleCreateUser = (newUser) =>{
    const maxId = users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;
    newUser.id = maxId + 1;
    setUsers([...users, newUser]);
    SetSelectedUserId(newUser.id);
    setIsCreatingUser(false);
  }

  // Filter users based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ flex: 2, marginRight: "20px" }}>
        <div
          style={{
            border: "2px solid black",
            borderRadius: "5%",
            padding: "10px",
          }}
        >
          <div>
            Search &nbsp; &nbsp;
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            &nbsp;&nbsp;
            <button onClick={() => setIsCreatingUser(true)}>Add</button>
          </div>
          <div>
            {filteredUsers.map((user) => (
              <UserComp
                key={user.id}
                user={user}
                onUpdate={handleUpdateUser}
                onDelete={handleDeleteUser}
                borderColor={userBorderColors[user.id] || "red"}
                onShowTasks={() => handleShowTasks(user.id)}
                style={{
                  backgroundColor : selectedUserId === user.id ? "orange" : "white",
                }}
                onAllTasksCompleted={() => handleAllTasksCompleted(user.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: 1 }}>
      {isCreatingUser ? (
          <AddUserComp onCreate={handleCreateUser} /> // Render user creation form
        ) : selectedUserId ? (
          <IdClickComp
            userId={selectedUserId}
            onAllTasksCompleted={() => handleAllTasksCompleted(selectedUserId)}
            tasks={tasks}
            setTasks={setTasks}
            posts={posts}
            setPosts={setPosts}
            todoDataRef={todoDataRef}
            postDataRef={postDataRef}
          />
        ) : null}
      </div>
    </div>
  );
};

export default GetAllUsersComp;
