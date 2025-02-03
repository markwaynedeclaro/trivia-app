import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Landing = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <div className='container bg-white-500 mx-auto text-1xl'>
      <h2>Welcome to the Landing Page</h2>
      <p>You are logged in with token: {token}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Landing;