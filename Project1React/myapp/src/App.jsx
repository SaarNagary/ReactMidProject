import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import GetAllUsersComp from "../Project/GetAllUsers";

function App() {
  const [tasks, setTasks] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <>
      <GetAllUsersComp
        tasks={tasks}
        setTasks={setTasks}
        posts={posts}
        setPosts={setPosts}
      />

    </>
  );
}

export default App;
