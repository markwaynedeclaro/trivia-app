import { useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate(); // Use the navigate hook inside a component

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className='container mt-5 mx-auto'>
      <div className='h-10'>

        <div className='rounded-2xl p-2 bg-sky-200 w-10 float-end cursor-pointer hover:bg-blue-300 transition duration-300'
        onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-black ">
            <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className='bg-blue-300 mx-auto text-1xl rounded-2xl p-5 mt-5'>
        <div className='flex flex-col'>
          <div className=''>
            <h2>Welcome to the Landing Page</h2>
          </div>
          <div className='text-xs'>
            <p>You are logged in with token: {token}</p>
          </div>
          <br/>
        </div>
      </div>

    </div>
  );
};

export default Landing;