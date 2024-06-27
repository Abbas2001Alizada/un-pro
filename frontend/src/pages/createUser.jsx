import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [user, setUser] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    image: null,
    role: 'User'
  });
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setUser({ ...user, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name',user.name);
    formData.append('username',user.username);
    formData.append('password',user.password);
    formData.append('email',user.email);
    formData.append('image',user.image);
    formData.append('role',user.role);

    try {
      await axios.post('http://localhost:8038/users/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('کاربر با موفقیت ایجاد شد');
      setUser({
        name: '',
        username: '',
        password: '',
        email: '',
        image: null,
        role: 'User'
      });
      setImagePreview(null);
    } catch {
      setMessage('خطا در ایجاد کاربر');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-950 p-4">
      <form className="w-full max-w-md bg-red-700 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 text-center text-white">ایجاد کاربر جدید</h2>
        {imagePreview && (
          <div className="mb-4 flex justify-center">
            <img src={imagePreview} alt="Preview" className="w-32 h-32 rounded-full object-cover border-2 border-white" />
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 mb-4">
          {['name', 'username', 'password', 'email'].map(field => (
            <div key={field}>
              <label className="block text-sm font-bold mb-2 text-white">{field}</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={user[field]}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-bold mb-2 text-white">تصویر</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-white">نقش</label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="User">کاربر</option>
              <option value="Admin">مدیر</option>
            </select>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-white text-red-950 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            ایجاد کاربر
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

export default CreateUser;
