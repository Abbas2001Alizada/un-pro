// src/components/DeleteUser.jsx

import React, { useState } from "react";
import axios from "axios";

const DeleteUser = ({ id }) => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      const adminZone = await axios.get(`http://localhost:8038/users/${id}`);
      const userZone = await axios.get(`http://localhost:8038/users/${userId}`);
      if (adminZone.data.zone === userZone.data.zone) {
        await axios.delete(`http://localhost:8038/users/${userId}`);
        setMessage("User successfully deleted");
        setError("");
      }
    } catch (err) {
      setError("Error deleting user");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen items-center flex flex-col items-right justify-center bg-red-950 p-4">
      <div className="w-full max-w-md bg-red-700 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-white mb-4">حذف حساب کاربر</h2>
        <label className="text-white" htmlFor="number">
          id کاربر 
        </label>{" "}
        <br />
        <input
          name="number"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="mb-4 p-2 border w-full rounded"
        />{" "}
        <br />
        <button
          onClick={handleDelete}
          className="bg-white text-black hover:bg-black hover:text-white font-bold py-2 px-4 rounded"
        >
          حذف
        </button>
        {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default DeleteUser;
