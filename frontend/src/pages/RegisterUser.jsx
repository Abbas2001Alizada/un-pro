import React, { useState } from 'react';
import axios from 'axios';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    image: null,
    role: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    const { name, username, password, email, image, role } = formData;

    if (!name.trim()) newErrors.name = 'نام ضروری است';
    if (!username.trim()) newErrors.username = 'نام کاربری ضروری است';
    if (password.length < 6) newErrors.password = 'رمز عبور باید حداقل ۶ حرف باشد';
    if (!email.trim()) newErrors.email = 'ایمیل ضروری است';
    if (!image) newErrors.image = 'انتخاب عکس ضروری است';
    if (role !== 'user' && role !== 'admin') newErrors.role = 'نقش باید کاربر یا ادمین باشد';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('username', formData.username);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('email', formData.email);
    if(formData.image instanceof file){
    formDataToSend.append('image', formData.image);}
    formDataToSend.append('role', formData.role);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8038/users', formDataToSend,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }}
      );
      setMessage(response.data.message);
      setFormData({
        name: '',
        username: '',
        password: '',
        email: '',
        image: null,
        role: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error:', error);
      setMessage('خطا در ارسال اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-950 p-4">
      <form className="w-full max-w-md bg-red-700 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 text-center text-white">افزودن کاربر جدید</h2>
        <div className="flex justify-center items-center mb-4">
          {formData.image ? (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Selected"
              className="rounded-full h-20 w-20 object-cover"
            />
          ) : (
            <div className="rounded-full h-20 w-20 bg-gray-300 flex items-center justify-center text-gray-600">
              عکس
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4">
          {['name', 'username', 'password', 'email', 'role'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-bold mb-2 text-white" htmlFor={field}>
                {field === 'name' && 'نام'}
                {field === 'username' && 'نام کاربری'}
                {field === 'password' && 'رمز عبور'}
                {field === 'email' && 'ایمیل'}
                {field === 'role' && 'نقش'}
              </label>
              {field === 'role' ? (
                <select
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">انتخاب نقش</option>
                  <option value="user">کاربر</option>
                  <option value="admin">ادمین</option>
                </select>
              ) : field === 'password' ? (
                <input
                  id={field}
                  name={field}
                  type="password"
                  value={formData[field]}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[field] ? 'border-red-500' : ''}`}
                />
              ) : (
                <input
                  id={field}
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[field] ? 'border-red-500' : ''}`}
                />
              )}
              {errors[field] && <p className="text-black text-xs italic">{errors[field]}</p>}
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-white" htmlFor="image">
              عکس
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`}
            />
            {errors.image && <p className="text-black text-xs italic">{errors.image}</p>}
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-white text-green-950 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            افزودن کاربر
          </button>
        </div>
      </form>
      {message && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className={`bg-red-900 text-white py-2 px-4 rounded ${message.includes('موفق') ? 'bg-green-500' : 'bg-red-500'}`}>
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterUser;
