import { useState, useEffect, useRef } from "react";
import AddTodoComp from "./AddTodo";
import TodoComp from "./Todo";
import AddPostComp from "./AddPost";
import PostComp from "./Post";
import { getAll, updateItem } from "../src/utils";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

function IdClickComp({ userId, onAllTasksCompleted, tasks, setTasks, posts, setPosts, todoDataRef, postDataRef}) {
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [isAddingPost, setIsAddingPost] = useState(false);


  const fetchTasks = async () => {
    try {
      let fetchedTasks = [];
      if (todoDataRef.current.has(userId)) {
        fetchedTasks = todoDataRef.current.get(userId);
      } else {
        const {data} = await getAll(`${TODOS_URL}?userId=${userId}`);
        fetchedTasks = Array.isArray(data) ? data : [];
        todoDataRef.current.set(userId, fetchedTasks);
      }
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  const fetchPosts = async () => {
    try {
      let fetchedPosts = [];
      if(postDataRef.current.has(userId)){
        fetchedPosts = postDataRef.current.get(userId);
      }
      else {
        const {data} = await getAll(`${POSTS_URL}?userId=${userId}`);
        fetchedPosts = Array.isArray(data) ? data : [];
        postDataRef.current.set(userId, fetchedPosts);
      }
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchPosts();
  }, [userId]);

  const handleAddTodo = (title) => {
    const newId = Date.now();
    const newTask = { id: newId, title, completed: false, userId };
    const updatedTasks = [...tasks, newTask];
    todoDataRef.current.set(userId, updatedTasks);
    setTasks(updatedTasks);
    setIsAddingTodo(false);
  };

  const handleAddPost = (title, body) => {
    const newId = Date.now();
    const newPost = { id: newId, title, body, userId };
    const updatedPosts = [...posts, newPost];
    postDataRef.current.set(userId, updatedPosts);
    setPosts(updatedPosts);
    setIsAddingPost(false);
  };

  const addButtonTodoHandler = () => { // עדיף לעשות במקום 2 פונקציות לעשות פונקציה אחת של todo ושל post עם if בפנים
    setIsAddingTodo(true);
    setIsAddingPost(false);
    fetchTasks();
  };

  const handleSetTasks = (updatedTasks) =>{
    todoDataRef.current.set(userId, updatedTasks);
    setTasks(updatedTasks);
    const allCompleted = updatedTasks.every(task => task.completed);
    if(allCompleted){
      onAllTasksCompleted();
    }
  }

  return (
    <div
      style={{
        marginLeft: "20px",
        border: "1px solid gray",
        padding: "10px",
        borderRadius: "10px",
        width: "300px",
      }}
    >
      <h5 style={{ display: "flex", alignItems: "center" }}>
        Todos - User {userId}
        <button
          onClick={addButtonTodoHandler}
          style={{ marginLeft: "auto", marginRight: "10px" }}
        >
          Add
        </button>
      </h5>
      {isAddingTodo ? (
        <AddTodoComp
          onAdd={handleAddTodo}
          onCancel={() => setIsAddingTodo(false)}
        />
      ) : (
        <TodoComp
          tasks={tasks}
          setTasks={handleSetTasks}
          onAllTasksCompleted={onAllTasksCompleted}
        />
      )}

      <h5 style={{ display: "flex", alignItems: "center" }}>
        Posts - User {userId}
        <button
          onClick={() => {
            setIsAddingPost(true);
            setIsAddingTodo(false);
          }}
          style={{ marginLeft: "auto", marginRight: "10px" }}
        >
          Add
        </button>
      </h5>
      {isAddingPost ? (
        <AddPostComp
          onAdd={handleAddPost}
          onCancel={() => setIsAddingPost(false)}
        />
      ) : (
        <PostComp posts={posts}/>
      )}
    </div>
  );
}

export default IdClickComp;
