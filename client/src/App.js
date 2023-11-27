import React, { useReducer, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { StateContext } from './contexts';
import Login from './components/Login';
import Registration from './components/Registration';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useResource } from 'react-request-hook';

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const {state, dispatch} = useContext(StateContext);

  const [todos, getTodos] = useResource(() => ({
    url: '/todos',
    method: 'get'
  }))

  useEffect(getTodos, [])

  useEffect(() => {
    if(todos && todos.isLoading === false && todos.data){
      dispatch({type: "GET_TODOS", todos: todos.data.reverse()})
    }
  }, [todos])
  
  return (
      <div className="App">
        {state.user ? (
          <div>
            <h1>Welcome, {state.user}!</h1>
            <button className="btn btn-danger" onClick={() => dispatch({ type: 'LOGOUT' })}>
              Logout
            </button>
            <TodoForm state={state} dispatch={dispatch}/>
            <TodoList state={state} dispatch={dispatch}/>
          </div>
        ) : (
          <div>
            <Login dispatch={dispatch}/>
            <Registration dispatch={dispatch}/>
          </div>
        )}
      </div>
  );
}

export default App;
