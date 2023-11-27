import React, { createContext, useReducer } from "react";

// Define your initial state
const initialState = {
  user: {},
  todos: [],
};

// Create the context
const StateContext = createContext();

// Create the reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: { username: action.username, access_token: action.access_token },
      };
    case "LOGOUT":
      return { user: {}, todos: [] };
    case "ADD_TODO":
      if (action.newTodo.title.trim() !== "") {
        return {
          ...state,
          todos: [{ ...action.newTodo }, ...state.todos],
        };
      }
      return state;
    case "TOGGLE_COMPLETE":
      const updatedTodos = state.todos.map((todo) =>
        todo._id === action.updatedTodo._id ? action.updatedTodo : todo
      );
      return { ...state, todos: [...updatedTodos] };
    case "DELETE_TODO":
      const filteredTodos = state.todos.filter(
        (todo) => todo._id !== action.deletedTodoId
      );
      return { ...state, todos: [...filteredTodos] };
    case "GET_TODOS":
      return {
        ...state,
        todos: [...action.todos],
      };
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
