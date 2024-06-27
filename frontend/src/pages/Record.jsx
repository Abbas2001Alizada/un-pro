import React, { useState } from "react";
import LoadingOverlay from "../component/LoadingOverlay.jsx";
import axios from "axios";

const Record = () => {
  const initialData = {
    Name: "",
    lastName: "",
    fatherName: "",
    GfatherName: "",
    gender: "",
    birthDate: "",
    birthPlace: "",
    residency: "",
    NIC: "",
    nation: "",
    religion: "",
    mode: "",
  };

  const [msg_success, setMsg_success] = useState("");
  const [husbandData, setHusbandData] = useState({ ...initialData, gender: "مرد", mode: "شوهر" });
  const [wifeData, setWifeData] = useState({ ...initialData, gender: "زن", mode: "خانم" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = "";

    if (value.trim() === "") {
      errorMsg = "این فیلد نباید خالی باشد";
    } else if (["Name", "lastName", "fatherName", "GfatherName"].includes(name) && /\d/.test(value)) {
      errorMsg = "این فیلد نباید حاوی عدد باشد";
    } else if (name === "NIC" && !/^\d+$/.test(value)) {
      errorMsg = "این فیلد باید فقط شامل اعداد باشد";
    } else if (name === "birthDate" && new Date(value) > new Date()) {
      errorMsg = "تاریخ تولد نباید در آینده باشد";
    }

    return errorMsg;
  };

  const handleChange = (e, setData, data) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    const errorMsg = validateField(name, value);
    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = {};

    Object.keys(husbandData).forEach((key) => {
      const errorMsg = validateField(key, husbandData[key]);
      if (errorMsg) {
        formIsValid = false;
        newErrors[key] = errorMsg;
      }
    });

    Object.keys(wifeData).forEach((key) => {
      const errorMsg = validateField(key, wifeData[key]);
      if (errorMsg) {
        formIsValid = false;
        newErrors[key] = errorMsg;
      }
    });

    setErrors(newErrors);

    if (formIsValid) {
      setLoading(true);

      try {
        const coupleData = { husbandData, wifeData };
        const response = await axios.post("http://localhost:8038/records", coupleData);
        setMsg_success(response.data.message);

        // Reset form data after successful submission
        setHusbandData({ ...initialData, gender: "مرد", mode: "شوهر" });
        setWifeData({ ...initialData, gender: "زن", mode: "خانم" });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-950 relative">
      <LoadingOverlay loading={loading} />
      <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
        <div className="bg-dark-red-800 text-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl mb-4 text-center">اطلاعات شوهر</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(husbandData).map((key) => (
              <div key={key}>
                <label className="block text-sm font-bold mb-2">
                  {key === "Name" && "نام"}
                  {key === "lastName" && "نام خانوادگی"}
                  {key === "fatherName" && "نام پدر"}
                  {key === "GfatherName" && "نام پدربزرگ"}
                  {key === "birthDate" && "تاریخ تولد"}
                  {key === "birthPlace" && "محل تولد"}
                  {key === "residency" && "محل اقامت"}
                  {key === "NIC" && "کد ملی"}
                  {key === "nation" && "ملیت"}
                  {key === "religion" && "دین"}
                  {key === "mode" && "حالت"}
                </label>
                {key === "gender" ? (
                  <select
                    name="gender"
                    value={husbandData[key]}
                    onChange={(e) => handleChange(e, setHusbandData, husbandData)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="مرد">مرد</option>
                  </select>
                ) : key === "mode" ? (
                  <select
                    name="mode"
                    value={husbandData[key]}
                    onChange={(e) => handleChange(e, setHusbandData, husbandData)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="شوهر">شوهر</option>
                  </select>
                ) : (
                  <input
                    type={key === "birthDate" ? "date" : "text"}
                    name={key}
                    value={husbandData[key]}
                    onChange={(e) => handleChange(e, setHusbandData, husbandData)}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors[key] ? "border-red-500" : ""
                    }`}
                  />
                )}
                {errors[key] && <p className="text-red-500 text-xs italic">{errors[key]}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-red-800 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 text-center">اطلاعات زن</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(wifeData).map((key) => (
              <div key={key}>
                <label className="block text-sm font-bold mb-2">
                  {key === "Name" && "نام"}
                  {key === "lastName" && "نام خانوادگی"}
                  {key === "fatherName" && "نام پدر"}
                  {key === "GfatherName" && "نام پدربزرگ"}
                  {key === "birthDate" && "تاریخ تولد"}
                  {key === "birthPlace" && "محل تولد"}
                  {key === "residency" && "محل اقامت"}
                  {key === "NIC" && "نمبر تذکره"}
                  {key === "nation" && "ملیت"}
                  {key === "religion" && "دین"}
                  {key === "mode" && "حالت"}
                </label>
                {key === "gender" ? (
                  <select
                    name="gender"
                    value={wifeData[key]}
                    onChange={(e) => handleChange(e, setWifeData, wifeData)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="زن">زن</option>
                  </select>
                ) : key === "mode" ? (
                  <select
                    name="mode"
                    value={wifeData[key]}
                    onChange={(e) => handleChange(e, setWifeData, wifeData)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="خانم">خانم</option>
                  </select>
                ) : (
                  <input
                    type={key === "birthDate" ? "date" : "text"}
                    name={key}
                    value={wifeData[key]}
                    onChange={(e) => handleChange(e, setWifeData, wifeData)}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors[key] ? "border-red-500" : ""
                    }`}
                  />
                )}
                {errors[key] && <p className="text-red-500 text-xs italic">{errors[key]}</p>}
              </div>
            ))}
          </div>
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
      <div className="mt-6 text-center  text-white py-2 px-4 rounded">
        {msg_success && <span>{msg_success}</span>}
      </div>
    </div>
  );
};

export default Record;
