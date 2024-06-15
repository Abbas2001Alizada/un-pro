import React, { useState } from "react";

const NewRecord = () => {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
    Name: "",
    lastName: "",
    fatherName: "",
    GfatherName: "",
    NIC: "",
    w_Name: "",
    w_fatherName: "",
    w_NIC: "",
    marriage_date: "",
    children_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStage = () => {
    if (stage < 3) {
      setStage(stage + 1);
    }
  };

  const prevStage = () => {
    if (stage > 1) {
      setStage(stage - 1);
    }
  };

  const renderStageContent = () => {
    switch (stage) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              مرحله اول: معلومات شوهر
            </h2>
            <label className="block mb-2">
              نام شوهر
              <input
                type="text"
                name="h_Name"
                value={formData.h_Name}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2">
            نام پدر شوهر
              <input
                type="text"
                name="h_fatherName"
                value={formData.h_fatherName}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2">
            نمبر تذکره شوهر
              <input
                type="text"
                name="h_NIC"
                value={formData.h_ID}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">
            مرحله دوم: معلومات خانم
            </h2>
            <label className="block mb-2">
              نام خانم
              <input
                type="text"
                name="w_Name"
                value={formData.w_Name}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2">
              نام پدر خانم
              <input
                type="text"
                name="w_fatherName"
                value={formData.w_fatherName}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2">
              نمبر تذکره خانم
              <input
                type="text"
                name="w_NIC"
                value={formData.w_NIC}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">
            مرحله سوم:معلومات ازدواج و فرزندان
            </h2>
            <label className="block mb-2">
            تاریخ ازدواج
              <input
                type="text"
                name="marriage_date"
                value={formData.marriage_date}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2">
            تعداد فرزندان
              <input
                type="text"
                name="children_number"
                value={formData.children_number}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />

            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl w-full bg-white p-6 rounded-lg shadow-lg mt-8">
      <nav className="mb-6">
        <ul className="flex space-x-4">
          <li
            className={`py-2 px-4 rounded-md ${
              stage === 1 ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            Stage 1
          </li>
          <li
            className={`py-2 px-4 rounded-md ${
              stage === 2 ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            Stage 2
          </li>
          <li
            className={`py-2 px-4 rounded-md ${
              stage === 3 ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            Stage 3
          </li>
        </ul>
      </nav>
      {renderStageContent()}
      <div className="mt-6 flex justify-between">
        {stage > 1 && (
          <button
            onClick={prevStage}
            className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none"
          >
            Previous
          </button>
        )}
        {stage < 3 && (
          <button
            onClick={nextStage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default NewRecord;
