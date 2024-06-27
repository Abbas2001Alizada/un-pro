import React, { useState } from "react";
import LoadingOverlay from "../component/LoadingOverlay.jsx";
import axios from "axios";

const RegisterChild = () => {
  const initialData = {
    name: "",
    lastName: "",
    gender: "",
    birthDate: "",
    birthPlace: "",
    parentId: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [msgSuccess, setMsgSuccess] = useState("");

  const validateField = (name, value) => {
    let errorMsg = "";

    if (value.trim() === "") {
      errorMsg = "این فیلد نباید خالی باشد";
    } else if (["name", "lastName"].includes(name) && /\d/.test(value)) {
      errorMsg = "این فیلد نباید حاوی عدد باشد";
    } else if (name === "parentId" && !/^\d+$/.test(value)) {
      errorMsg = "این فیلد باید فقط شامل اعداد باشد";
    } else if (name === "birthDate" && new Date(value) > new Date()) {
      errorMsg = "تاریخ تولد نباید در آینده باشد";
    }

    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const errorMsg = validateField(name, value);
    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const errorMsg = validateField(key, formData[key]);
      if (errorMsg) {
        formIsValid = false;
        newErrors[key] = errorMsg;
      }
    });

    setErrors(newErrors);

    if (formIsValid) {
      setLoading(true);

      try {
        const response = await axios.post("http://localhost:8038/children", formData);
        setMsgSuccess(response.data.message);

        // Reset form data after successful submission
        setFormData(initialData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 justify-center bg-red-950 relative">
      <LoadingOverlay loading={loading} />
      <form className="w-full max-w-md bg-red-800 text-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 text-center">ورود اطلاعات فرزند</h2>
        <div className="grid grid-cols-1 gap-4">
          {Object.keys(initialData).map((key) => (
            <div key={key}>
              <label className="block text-sm font-bold mb-2">
                {key === "name" && "نام"}
                {key === "lastName" && "نام خانوادگی"}
                {key === "gender" && "جنسیت"}
                {key === "birthDate" && "تاریخ تولد"}
                {key === "birthPlace" && "محل تولد"}
                {key === "parentId" && "شماره خانواده "}
              </label>
              {key === "gender" ? (
                <select
                  name="gender"
                  value={formData[key]}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="مرد">مرد</option>
                  <option value="زن">زن</option>
                </select>
              ) : (
                <input
                  type={key === "birthDate" ? "date" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors[key] ? "border-red-500" : ""
                  }`}
                />
              )}
              {errors[key] && <p className="text-black text-xs italic">{errors[key]}</p>}
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-dark-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            ارسال
          </button>
        </div>
      </form>
      <div className="mt-6 text-center text-white py-2 px-4 rounded">
        {msgSuccess && <span>{msgSuccess}</span>}
      </div>
    </div>
  );
};

export default RegisterChild;
