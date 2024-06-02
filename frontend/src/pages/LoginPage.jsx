import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
function LoginPage() {
  // just for testing purposes
  // const user = "";
  // if (user) {
  //   return <Navigate to="/dashboard" />;
  // }

  useEffect(() => {
    const url = "http://localhost:8000/test";
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          ورود به حساب کاربری
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              نام کاربری
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="نام کاربری خود را وارد کنید"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="رمز عبور خود را وارد کنید"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              ورود
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
