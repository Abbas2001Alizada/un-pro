import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditableProfile = ({ userId }) => {
  const [user, setUser] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    profilePicture: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8038/api/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        setError('Failed to fetch user data');
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8038/api/user/${userId}`, user);
      setEditMode(false);
    } catch (error) {
      setError('Failed to update user data');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-950 via-red-400 to-red-950 rounded p-3">
      <div className="w-full max-w-lg p-8 space-y-8 bg-gradient-to-r from-red-950 via-red-400 to-red-950 shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white">پروفایل کاربر</h2>
        {error && <p className="text-red-300">{error}</p>}
        <div className="space-y-4">
          <div className="flex justify-center">
            <label htmlFor="profilePicture" className="cursor-pointer">
              <img
                src={user.profilePicture || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-green-300 hover:opacity-90 transition duration-200"
              />
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-white">نام</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-green-200 text-gray-800"
              disabled={!editMode}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">نام کاربری</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-green-200 text-gray-800"
              disabled={!editMode}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">رمز عبور</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-green-200 text-gray-800"
              disabled={!editMode}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">ایمیل</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-green-200 text-gray-800"
              disabled={!editMode}
            />
          </div>
          {editMode ? (
            <button
              onClick={handleSave}
              className="w-full py-3 text-white bg-green-800 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
            >
              ذخیره
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="w-full py-3 text-white bg-red-950 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
            >
              ویرایش
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableProfile;
