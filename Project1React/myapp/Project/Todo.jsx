import React, { useEffect, useState } from "react";


function TodoComp({ tasks, setTasks,  onAllTasksCompleted }) {
    const completedTask = (taskId) => {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: true } : task
      );
      setTasks(updatedTasks);
    };

  return (
    <div className="Wraper" style={{ display: "flex", flexDirection: "column", gap: "10px", height : "15rem", overflow : "auto" }}>
      {tasks.map(task => (
        <div key={task.id} style={{
          border: "1px solid gray",
          padding: "10px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center"
        }}>
          <div style={{ flex: 1 }}>
            User ID : {task.userId} <br/>
            <strong>Title:</strong> {task.title}<br />
            <strong>Completed:</strong> {task.completed ? "True" : "False"}

          </div>
          {!task.completed && (
            <button style={{ marginLeft: "10px" }} onClick={() => completedTask(task.id)}>Mark Completed</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoComp;