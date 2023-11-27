import React, { useState, useEffect } from 'react';
import { useResource } from 'react-request-hook';

export default function Login({dispatch}) {
  // State to manage form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [user, loginUser] = useResource((username, password) => ({
    url: '/login',
    method: 'post',
    data: {email: username, password}
  }))

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(username, password)

    // Additional logic for authentication can be added here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  useEffect(() => {
    // Dispatch the 'LOGIN' action with the entered username
    if (user && user.data) {
    dispatch({ type: 'LOGIN', loginUser: user.data.user.email });
    }
  }, [user])

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <br/>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <br/>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='btn btn-primary mt-2'>Login</button>
      </form>
    </div>
  );
};

// export default Login;
