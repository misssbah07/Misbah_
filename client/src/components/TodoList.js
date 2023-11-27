import React, {useEffect, useState} from 'react';
import { useResource } from 'react-request-hook';

const TodoList = ({state, dispatch}) => {

  const [clickedTodoId, setClickedTodoId] = useState("")
  const {user, todos} = state

  const [updatedTodo, updateTodo] = useResource((updatedTodo) => ({
    url: `/todos/${updatedTodo.id}`,
    method: 'put',
    data: updatedTodo
  }))

  const [deletedTodo, deleteTodo] = useResource((id) => ({
    url: `/todos/${id}`,
    method: 'delete'
  }))


  // Function to handle checkbox changes
  const handleCheckboxChange = (e, todo) => {
    const updatedTodo = {...todo, complete: e.target.checked, dateCompleted: e.target.checked === true ? Date.now() : null}
    updateTodo(updatedTodo)
  };
  
  const handleTodoDelete = (id) => {
    setClickedTodoId(id)
    deleteTodo(id)
  }
  
  useEffect(() => {
    if(updatedTodo && updatedTodo.data) {
      dispatch({ type: 'TOGGLE_COMPLETE', updatedTodo: updatedTodo.data });
    }
  }, [updatedTodo])

  useEffect(() => {
    if(deletedTodo && deletedTodo.data){
      dispatch({type: "DELETE_TODO", deletedTodoId: clickedTodoId})
    }
  }, [deletedTodo])

  return (
    <div>
      <h2>Todo List</h2>
      <ul className='list-group'>
        {todos.map((todo, index) => (
          <li className="list-group-item" key={index}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={(e) => handleCheckboxChange(e, todo)}
              />
              {todo.title}
            </label>
            {todo.description && <p>Description: {todo.description}</p>}
            <p>Author: {user}</p>
            <p>Date Created: {new Date(todo.dateCreated).toLocaleDateString()}</p>
            {todo.complete && <p>Date Completed: {new Date(todo.dateCompleted).toLocaleDateString()}</p>}
            <button
              className='btn btn-danger'
              onClick={() => handleTodoDelete(todo.id)}>DELETE</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
