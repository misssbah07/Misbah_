import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const initialTodos = [
  {
    title: 'Sample Todo',
    description: 'This is a sample description.',
    author: 'user1',
    dateCreated: Date.now(),
    complete: false,
    dateCompleted: null,
  },
];

function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    author: '',
    dateCreated: null,
    complete: false,
    dateCompleted: null,
  });
  const [loginUser, setLoginUser] = useState('');
  const [registerUser, setRegisterUser] = useState('');

  const handleLogin = () => {
    setUser(loginUser);
    setNewTodo((prevTodo) => ({ ...prevTodo, author: loginUser }));
  };

  const handleRegister = () => {
    setUser(registerUser);
    setNewTodo((prevTodo) => ({ ...prevTodo, author: registerUser }));
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddTodo = () => {
    if (newTodo.title.trim() !== '') {
      setTodos([...todos, { ...newTodo, dateCreated: Date.now() }]);
      setNewTodo({
        title: '',
        description: '',
        author: user,
        dateCreated: null,
        complete: false,
        dateCompleted: null,
      });
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = {
      ...updatedTodos[index],
      complete: !updatedTodos[index].complete,
      dateCompleted: Date.now(),
    };
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <h1>Welcome, {user}!</h1>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
          <h2>Todo List</h2>
          <ul className="list-group">
            {todos.map((todo, index) => (
              <li key={index} className="list-group-item">
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => handleToggleComplete(index)}
                />
                <span style={{ marginLeft: '10px' }}>
                  {todo.title} - {todo.description} - {todo.author} -{' '}
                  {todo.dateCreated ? new Date(todo.dateCreated).toLocaleString() : ''}
                </span>
              </li>
            ))}
          </ul>
          <div>
            <h3>Add New Todo</h3>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              />
            </div>
            <button className="btn btn-success" onClick={handleAddTodo}>
              Add Todo
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h2>Login</h2>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div>
            <h2>Register</h2>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={registerUser}
                onChange={(e) => setRegisterUser(e.target.value)}
              />
            </div>
            <button className="btn btn-success" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
