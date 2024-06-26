import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8038/users/login', { username, password });
      const userId = response.data.userId;
      const userRole=response.data.userRole;
      if(userRole==='مدیر'){
      navigate(`/AdminDashboard/${userId}`)
    }else{
      navigate(`/UserDashboard/${userId}`)}
    } catch (error) {
      setError('اعتبارنامه نامعتبر است. لطفا دوباره امتحان کنید.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-950 via-red-400 to-red-950 rounded p-3">
      <form onSubmit={handleLogin} className="max-w-sm mx-auto bg-red-950 p-4 rounded shadow-md">
        <h2 className="text-white text-2xl mb-4 text-center">ورود</h2>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="username">نام کاربری</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">رمز عبور</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className=' flex'>
        <button type="submit" className=" flex-2/3 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">ورود</button>
       <Link to='/'> <button type="button" className= " flex-1/3 bg-white text-black hover:bg-green-900  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">برگشت</button>
       </Link>
       </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
