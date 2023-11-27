import React, { useEffect, useState } from 'react';
import { useResource } from 'react-request-hook';

const Registration = ({dispatch}) => {
  // State to manage form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [user, registerUser] = useResource((username, password) => ({
    url: '/register',
    method: 'post',
    data: {email: username, password}
  }))

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser(username, password)

    // Additional logic for registration can be added here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  useEffect(() => {
    // Dispatch the 'REGISTER' action with the entered username
    if (user && user.data) {
      console.log(user.data)
      dispatch({ type: 'REGISTER', registerUser: user.data.user.email });
    }
  }, [user])
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registration-username">Username:</label>
          <br/>
          <input
            type="text"
            id="registration-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="registration-password">Password:</label>
          <br/>
          <input
            type="password"
            id="registration-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='btn btn-success mt-2'>Register</button>
      </form>
    </div>
  );
};

export default Registration;
