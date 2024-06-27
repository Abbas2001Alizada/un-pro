import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8038/user/${username}`);
      setMessage('کاربر با موفقیت حذف شد');
      setUsername('');
    } catch (error) {
      setMessage('خطا در حذف کاربر: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-950 p-4">
      <form className="w-full max-w-md bg-red-800 p-6 rounded-lg shadow-md" onSubmit={handleDelete}>
        <h2 className="text-2xl mb-4 text-center text-white">حذف کاربر</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-white" htmlFor="username">شماره کاربر</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            aria-label="شماره کاربر"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-4 text-center">
          <button
            type="submit"
            className="bg-white text-red-950 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            aria-label="حذف کاربر"
          >
            حذف کاربر
          </button>
        </div>
      </form>
      {message && (
        <div className={`mt-6 text-center py-2 px-4 rounded ${message.includes('موفقیت') ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
