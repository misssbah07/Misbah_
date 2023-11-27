import React, { useEffect, useState } from "react";
import { useResource } from "react-request-hook";

const Registration = ({ dispatch }) => {
  // State to manage form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const [user, registerUser] = useResource((username, password) => ({
    url: "/auth/register",
    method: "post",
    data: { username, password, passwordConfirmation: password },
  }));

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser(username, password);
  };

  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setStatus("Registration failed, please try again later.");
      } else {
        setStatus("Registration successful. You may now login.");
      }
    }
  }, [user]);
  return (
    <div>
      <h2>Register</h2>
      <p>{status}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registration-username">Username:</label>
          <br />
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
          <br />
          <input
            type="password"
            id="registration-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success mt-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
