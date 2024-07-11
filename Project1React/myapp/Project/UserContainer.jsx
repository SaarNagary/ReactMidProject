import { useState } from "react";
import IdClickComp from "./IdClick";
import { updateItem } from "../src/utils";
import AddTodoComp from "./AddTodo";
import TodoComp from "./Todo";

function UserContainerComp({user, onUpdate, onDelete}) {
  const [borderColor, setBorderColor] = useState('red');
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState(false);

  const handleAllTasksCompleted = () =>{
     setBorderColor('green');
  }

  const handleShowTasks = () =>{
     setShowTasks(prevShowTasks => !prevShowTasks);
  }


  return (
    <div style={{display : "flex", alignItems : "flex-start"}}>
       <UserComp user={user}
       onUpdate={onUpdate}
       onDelete={onDelete}
       onShowTasks={handleShowTasks} // Pass the task visibility toggle handler
       />
       {showTasks && (
         <IdClickComp userId={user.id} onAllTasksCompleted={handleAllTasksCompleted} />
       )}
    </div>
  )
}

export default UserContainerComp;