import React, { useState } from 'react';

const TodoList = ({ todos }) => {
  // State to manage the todo list
  const [todoList, setTodoList] = useState(todos);

  // Function to handle checkbox changes
  const handleCheckboxChange = (index) => {
    // Create a copy of the todo list
    const updatedTodoList = [...todoList];
    
    // Toggle the 'complete' property of the selected todo
    updatedTodoList[index].complete = !updatedTodoList[index].complete;

    // If the todo is marked as complete, update the 'dateCompleted' property
    if (updatedTodoList[index].complete) {
      updatedTodoList[index].dateCompleted = Date.now();
    } else {
      // If the todo is marked as incomplete, reset the 'dateCompleted' property
      updatedTodoList[index].dateCompleted = null;
    }

    // Update the state with the modified todo list
    setTodoList(updatedTodoList);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todoList.map((todo, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleCheckboxChange(index)}
              />
              {todo.title}
            </label>
            {todo.description && <p>Description: {todo.description}</p>}
            <p>Author: {todo.author}</p>
            <p>Date Created: {todo.dateCreated}</p>
            {todo.complete && <p>Date Completed: {todo.dateCompleted}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
