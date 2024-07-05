import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckForm = ({ onClose }) => {
  const [searchType, setSearchType] = useState("specification");
  const [formData, setFormData] = useState({
    husbandName: "",
    husbandNIC: "",
    familyID: "",
    husbandDOB: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    // Reset errors when user starts typing
    if (errors[name]) {
      setErrors((prevState) => ({ ...prevState, [name]: "" }));
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (searchType === "specification") {
      if (!formData.husbandName) {
        validationErrors.husbandName = "نام زوج نمیتواند خالی باشد";
      }
      if (!formData.husbandNIC) {
        validationErrors.husbandNIC = "نمبر تذکره زوج نمیتواند خالی باشد";
      }
    } else if (searchType === "id") {
      if (!formData.familyID) {
        validationErrors.familyID = "کود خانواده نمیتواند خالی باشد";
      }
      if (!formData.husbandDOB) {
        validationErrors.husbandDOB = "تاریخ تولد زوج نمیتواند خالی باشد";
      }
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        let response;
        if (searchType === "specification") {
          // Searching by husband name and NIC
          const specification = {
            mode: "شوهر",
            name: formData.husbandName,
            NIC: formData.husbandNIC,
          };
          response = await axios.post(
            "http://localhost:8038/appointment",
            specification
          );
        } else if (searchType === "id") {
          // Searching by family ID
          const familyCode = { familyCode: formData.familyID };
          response = await axios.post(
            "http://localhost:8038/appointment",
            familyCode
          );
        }

        // Check response state and redirect accordingly
        if (response.data.redirectPath) {
          navigate(response.data.redirectPath, {
            state: response.data.appointmentTime ? { appointmentTime: response.data.appointmentTime } : {},
          });
        } else {
          console.error("Error: Appointment not found or invalid state");
        }
      } catch (error) {
        console.error("Error checking appointment:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-red-950 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <button
            className={`px-4 py-2 ${
              searchType === "specification"
                ? "bg-blue-500 border-2 border-green-300 rounded text-white"
                : "bg-gray-200"
            } rounded`}
            onClick={() => setSearchType("specification")}
          >
            جستجو براساس مشخصات
          </button>
          <button
            className={`px-4 py-2 ${
              searchType === "id"
                ? "bg-blue-500 border-2 border-green-300 rounded text-white"
                : "bg-gray-200"
            } rounded`}
            onClick={() => setSearchType("id")}
          >
            جستجو براساس شناسه
          </button>
        </div>

        {searchType === "specification" ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white">نام زوج</label>
              <input
                type="text"
                name="husbandName"
                value={formData.husbandName}
                onChange={handleInputChange}
                className={`mt-1 block w-full border ${
                  errors.husbandName ? "border-red-500" : "border-gray-300"
                } rounded-md p-2`}
              />
              {errors.husbandName && (
                <p className="text-red-500 text-xs italic">
                  {errors.husbandName}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-white">نمبر تذکره زوج</label>
              <input
                type="text"
                name="husbandNIC"
                value={formData.husbandNIC}
                onChange={handleInputChange}
                className={`mt-1 block w-full border ${
                  errors.husbandNIC ? "border-red-500" : "border-gray-300"
                } rounded-md p-2`}
              />
              {errors.husbandNIC && (
                <p className="text-red-500 text-xs italic">
                  {errors.husbandNIC}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md"
            >
              جستجو
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white">کود خانواده</label>
              <input
                type="text"
                name="familyID"
                value={formData.familyID}
                onChange={handleInputChange}
                className={`mt-1 block w-full border ${
                  errors.familyID ? "border-red-500" : "border-gray-300"
                } rounded-md p-2`}
              />
              {errors.familyID && (
                <p className="text-red-500 text-xs italic">{errors.familyID}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-white">تاریخ تولد زوج</label>
              <input
                type="date"
                name="husbandDOB"
                value={formData.husbandDOB}
                onChange={handleInputChange}
                className={`mt-1 block w-full border ${
                  errors.husbandDOB ? "border-red-500" : "border-gray-300"
                } rounded-md p-2`}
              />
              {errors.husbandDOB && (
                <p className="text-red-500 text-xs italic">
                  {errors.husbandDOB}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md"
            >
              جستجو
            </button>
          </form>
        )}

        <button
          className="mt-4 w-full bg-red-500 text-white p-2 rounded-md"
          onClick={onClose}
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default CheckForm;
