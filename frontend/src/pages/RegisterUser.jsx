import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    const { name, username, password, email, role } = formData;

    if (!name.trim()) newErrors.name = 'نام ضروری است';
    if (!username.trim()) newErrors.username = 'نام کاربری ضروری است';
    if (password.length < 6) newErrors.password = 'رمز عبور باید حداقل ۶ حرف باشد';
    if (!email.trim()) newErrors.email = 'ایمیل ضروری است';
    if (role !== 'کاربر' && role !== 'مدیر') newErrors.role = 'نقش باید کاربر یا مدیر باشد';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8038/users/createUser', formData);
      setMessage("اطلاعات موفقانه ثبت گردید");
      setFormData({
        name: '',
        username: '',
        password: '',
        email: '',
        role: ''
      });
      setErrors({});
      setTimeout(() => {
        setMessage('');
      }, 5000); // Clear message after 5 seconds
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message && error.response.data.message.includes('username must be unique')) {
        setMessage('نام کاربری تکراری است');
      } else {
        setMessage('خطا در ارسال اطلاعات');
      }
      setTimeout(() => {
        setMessage('');
      }, 5000); // Clear message after 5 seconds
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-950 p-4">
      <form className="w-full max-w-md bg-red-700 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 text-center text-white">افزودن کاربر جدید</h2>

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
                  <option value="کاربر">کاربر</option>
                  <option value="مدیر">مدیر</option>
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className={`py-2 px-4 rounded ${message.includes('موفق') ? 'bg-white text-green-600': 'bg-white  text-red-600'}`}>
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
