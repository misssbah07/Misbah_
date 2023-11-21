import React, { useState } from 'react';
import Login from './components/Login';
import Registration from './components/Registration';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  // State to manage user authentication
  const [user, setUser] = useState(null);

  // State to manage the todo list
  const [todos, setTodos] = useState([]);

  // Function to handle user login
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  // Function to handle user registration
  const handleRegistration = (registeredUser) => {
    setUser(registeredUser);
  };

  // Function to handle adding a new todo
  const handleAddTodo = (newTodo) => {
    // You can update the todos state here or call a function to update it
    setTodos([...todos, newTodo]);
  };

  // Conditionally render components based on user authentication status
  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <>
            <h1>Welcome, {user.username}!</h1>
            <TodoForm onSubmit={handleAddTodo} />
            <TodoList todos={todos} />
          </>
        ) : (
          <>
            <Login onLogin={handleLogin} />
            <Registration onRegistration={handleRegistration} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
