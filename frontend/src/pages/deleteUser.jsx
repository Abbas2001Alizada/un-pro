import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = () => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8038/users/${id}`);
      setMessage('کاربر با موفقیت حذف شد');
      setId('');
      setIsPopupVisible(true);
      setTimeout(() => {
        setIsPopupVisible(false);
        setMessage('');
      }, 5000); // Clear message after 5 seconds
    } catch (error) {
      setMessage('خطا در حذف کاربر: ' + error.message);
      setIsPopupVisible(true);
      setTimeout(() => {
        setIsPopupVisible(false);
        setMessage('');
      }, 5000); // Clear message after 5 seconds
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-red-950 p-4">
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}
      <form className={`w-full max-w-md bg-red-800 p-6 rounded-lg shadow-md ${isPopupVisible ? 'z-0' : 'z-20'}`} onSubmit={handleDelete}>
        <h2 className="text-2xl mb-4 text-center text-white">حذف کاربر</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-white" htmlFor="username">شماره کاربر</label>
          <input
            id="id"
            type="text"
            name="id"
            value={id}
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
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className={`bg-white py-2 px-4 rounded shadow-lg ${message.includes('موفقیت') ? 'text-green-600' : 'text-red-600'}`}>
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
