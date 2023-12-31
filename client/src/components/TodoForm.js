import React, { useState, useEffect } from "react";
import { useResource } from "react-request-hook";
import { v4 as uuidv4 } from "uuid";

const TodoForm = ({ state, dispatch }) => {
  // State to manage form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [todo, addTodo] = useResource(({ title, description }) => ({
    url: "/todos",
    method: "post",
    headers: { Authorization: `${state?.user?.access_token}` },
    data: { title, description },
  }));

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if the title is not empty before dispatching the ADD_TODO action
    if (title.trim() === "") {
      alert("Title cannot be empty");
      return;
    }

    addTodo({ title, description });

    // Clear the form inputs after dispatching the action
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    // Dispatch the 'ADD_TODO' action with the new todo data
    if (todo && todo.isLoading === false && todo.data) {
      dispatch({ type: "ADD_TODO", newTodo: todo.data });
    }
  }, [todo]);

  return (
    <div>
      <h2>Add New Todo</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
