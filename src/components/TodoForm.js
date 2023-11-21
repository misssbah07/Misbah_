import React, { useState } from 'react';

const TodoForm = ({ onSubmit }) => {
  // State to manage form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if the title is not empty before submitting
    if (title.trim() === '') {
      alert('Title cannot be empty');
      return;
    }

    // Create a new todo object with required properties
    const newTodo = {
      title: title,
      description: description,
      // Other properties like author, dateCreated, complete, and dateCompleted can be added here
    };

    // Call the onSubmit function passed as a prop and pass the new todo
    onSubmit(newTodo);

    // Clear the form inputs after submission
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <h2>Add New Todo</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
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
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default TodoForm;
