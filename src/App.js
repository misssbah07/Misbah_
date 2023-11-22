import React, { useState, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Define your initial state and reducer function outside of the component
const initialState = {
  user: null,
  todos: [
    {
      title: 'Sample Todo',
      description: 'This is a sample description.',
      author: 'user1',
      dateCreated: Date.now(),
      complete: false,
      dateCompleted: null,
    },
  ],
  newTodo: {
    title: '',
    description: '',
    author: '',
    dateCreated: null,
    complete: false,
    dateCompleted: null,
  },
  loginUser: '',
  registerUser: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: state.loginUser, newTodo: { ...state.newTodo, author: state.loginUser } };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'REGISTER':
      return { ...state, user: state.registerUser, newTodo: { ...state.newTodo, author: state.registerUser } };
    case 'ADD_TODO':
      if (state.newTodo.title.trim() !== '') {
        return {
          ...state,
          todos: [...state.todos, { ...state.newTodo, dateCreated: Date.now() }],
          newTodo: { ...state.newTodo, title: '', description: '', dateCreated: null, complete: false, dateCompleted: null },
        };
      }
      return state;
    case 'TOGGLE_COMPLETE':
      const updatedTodos = [...state.todos];
      updatedTodos[action.index] = {
        ...updatedTodos[action.index],
        complete: !updatedTodos[action.index].complete,
        dateCompleted: Date.now(),
      };
      return { ...state, todos: updatedTodos };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddTodo = () => {
    dispatch({ type: 'ADD_TODO' });
  };

  const handleToggleComplete = (index) => {
    dispatch({ type: 'TOGGLE_COMPLETE', index });
  };

  return (
    <div className="App">
      {state.user ? (
        <div>
          <h1>Welcome, {state.user}!</h1>
          <button className="btn btn-danger" onClick={() => dispatch({ type: 'LOGOUT' })}>
            Logout
          </button>
          <h2>Todo List</h2>
          <ul className="list-group">
            {state.todos.map((todo, index) => (
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
                value={state.newTodo.title}
                onChange={(e) => dispatch({ type: 'CHANGE_TITLE', value: e.target.value })}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={state.newTodo.description}
                onChange={(e) => dispatch({ type: 'CHANGE_DESCRIPTION', value: e.target.value })}
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
                value={state.loginUser}
                onChange={(e) => dispatch({ type: 'CHANGE_LOGIN_USER', value: e.target.value })}
              />
            </div>
            <button className="btn btn-primary" onClick={() => dispatch({ type: 'LOGIN' })}>
              Login
            </button>
          </div>
          <div>
            <h2>Register</h2>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={state.registerUser}
                onChange={(e) => dispatch({ type: 'CHANGE_REGISTER_USER', value: e.target.value })}
              />
            </div>
            <button className="btn btn-success" onClick={() => dispatch({ type: 'REGISTER' })}>
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
