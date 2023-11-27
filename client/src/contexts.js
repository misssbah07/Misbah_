import React, { createContext, useReducer } from 'react';

// Define your initial state
const initialState = {
  user: null,
  todos: [
    // {
    //   title: 'Sample Todo',
    //   description: 'This is a sample description.',
    //   author: 'user1',
    //   dateCreated: Date.now(),
    //   complete: false,
    //   dateCompleted: null,
    // },
  ],
};

// Create the context
const StateContext = createContext();

// Create the reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.loginUser };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'REGISTER':
      return { ...state, user: action.registerUser };
    case 'ADD_TODO':
      if (action.newTodo.title.trim() !== '') {
        return {
          ...state,
          todos: [{ ...action.newTodo}, ...state.todos],
        };
      }
      return state;
    case 'TOGGLE_COMPLETE':
      const updatedTodos = state.todos.map((todo) => todo.id === action.updatedTodo.id ? action.updatedTodo : todo)
      return { ...state, todos: [...updatedTodos] };
    case 'DELETE_TODO':
      console.log("in delete")
      const filteredTodos = state.todos.filter((todo) => todo.id !== action.deletedTodoId)
      console.log(filteredTodos)
      return {...state, todos: [...filteredTodos]}
    case 'GET_TODOS': 
      return {
        ...state,
        todos: [...action.todos]
      }
    default:
      return state;
  }
};

// Create the StateProvider component
const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
