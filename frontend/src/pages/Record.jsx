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

  const [familyCode, setFamilyCode] = useState("");
  const [msg_success, setMsg_success] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [husbandData, setHusbandData] = useState({
    ...initialData,
    gender: "مرد",
    mode: "شوهر",
  });
  const [wifeData, setWifeData] = useState({
    ...initialData,
    gender: "زن",
    mode: "خانم",
  });
  const [loading, setLoading] = useState(false);
  const [husbandErrors, setHusbandErrors] = useState({});
  const [wifeErrors, setWifeErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = "";

    if (value.trim() === "") {
      errorMsg = "این فیلد نباید خالی باشد";
    } else if (
      ["Name", "lastName", "fatherName", "GfatherName"].includes(name) &&
      /\d/.test(value)
    ) {
      errorMsg = "این فیلد نباید حاوی عدد باشد";
    } else if (name === "NIC" && !/^[\d-_]+$/.test(value)) {
      errorMsg = "این فیلد باید فقط شامل اعداد، خط تیره و زیرخط باشد";
    } else if (name === "birthDate" && new Date(value) > new Date()) {
      errorMsg = "تاریخ تولد نباید در آینده باشد";
    }

    return errorMsg;
  };

  const handleChange = (
    e,
    setData,
    data,
    setErrors,
    errors,
    synchronizeResidency = false,
    isHusband = true
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    const errorMsg = validateField(name, value);
    setErrors({ ...errors, [name]: errorMsg });

    if (synchronizeResidency && name === "residency") {
      if (isHusband) {
        setWifeData((prevWifeData) => ({ ...prevWifeData, residency: value }));
      } else {
        setHusbandData((prevHusbandData) => ({
          ...prevHusbandData,
          residency: value,
        }));
      }
    }
  };

  const getZoneNumber = (residency) => {
    const zoneMap = {
      1: 5, 2: 2, 3: 3, 4: 6, 5: 3, 6: 5, 7: 5, 8: 5,
      9: 2, 10: 2, 11: 4, 12: 1, 13: 3, 14: 3, 15: 6,
      16: 1, 17: 4, 18: 4, 19: 6, 20: 6, 21: 1, 22: 1,
    };
    return zoneMap[residency] || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formIsValid = true;
    const newHusbandErrors = {};
    const newWifeErrors = {};

    Object.keys(husbandData).forEach((key) => {
      const errorMsg = validateField(key, husbandData[key]);
      if (errorMsg) {
        formIsValid = false;
        newHusbandErrors[key] = errorMsg;
      }
    });

    Object.keys(wifeData).forEach((key) => {
      const errorMsg = validateField(key, wifeData[key]);
      if (errorMsg) {
        formIsValid = false;
        newWifeErrors[key] = errorMsg;
      }
    });

    setHusbandErrors(newHusbandErrors);
    setWifeErrors(newWifeErrors);

    if (formIsValid) {
      setLoading(true);

      try {
        const zoneNumber = getZoneNumber(husbandData.residency);
        const coupleData = { husbandData, wifeData, zoneNumber };
        console.log(coupleData);
        const response = await axios.post(
          "http://localhost:8038/records",
          coupleData
        );
        setMsg_success(response.data.message);
        setModalVisible(true);
        setFamilyCode(response.data.familyCode);

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
                  {key === "lastName" && "تخلص"}
                  {key === "fatherName" && "نام پدر"}
                  {key === "GfatherName" && "نام پدر کلان"}
                  {key === "gender" && "جنسیت"}
                  {key === "birthDate" && "تاریخ تولد"}
                  {key === "birthPlace" && "محل تولد"}
                  {key === "residency" && "ناحیه سکونت در کابل"}
                  {key === "NIC" && "نمبر تذکره"}
                  {key === "nation" && "قوم"}
                  {key === "religion" && "دین"}
                  {key === "mode" && "حالت"}
                </label>
                {key === "gender" ? (
                  <select
                    name="gender"
                    value={husbandData[key]}
                    onChange={(e) =>
                      handleChange(
                        e,
                        setHusbandData,
                        husbandData,
                        setHusbandErrors,
                        husbandErrors
                      )
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="مرد">مرد</option>
                  </select>
                ) : key === "mode" ? (
                  <select
                    name="mode"
                    value={husbandData[key]}
                    onChange={(e) =>
                      handleChange(
                        e,
                        setHusbandData,
                        husbandData,
                        setHusbandErrors,
                        husbandErrors
                      )
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="شوهر">شوهر</option>
                  </select>
                ) : key === "residency" ? (
                  <select
                    name="residency"
                    value={husbandData[key]}
                    onChange={(e) =>
                      handleChange(
                        e,
                        setHusbandData,
                        husbandData,
                        setHusbandErrors,
                        husbandErrors,
                        true,
                        true
                      )
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">انتخاب کنید</option>
                    {[...Array(22)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={key === "birthDate" ? "date" : "text"}
                    name={key}
                    value={husbandData[key]}
                    onChange={(e) =>
                      handleChange(
                        e,
                        setHusbandData,
                        husbandData,
                        setHusbandErrors,
                        husbandErrors
                      )
                    }
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      husbandErrors[key] ? "border-red-500" : ""
                    }`}
                  />
                )}
                {husbandErrors[key] && (
                  <p className="text-red-500 text-xs italic">
                    {husbandErrors[key]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-red-800 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 text-center">اطلاعات خانم</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(wifeData).map((key) => (
              <div key={key}>
                <label className="block text-sm font-bold mb-2">
                  {key === "Name" && "نام"}
                  {key === "lastName" && "تخلص"}
                  {key === "fatherName" && "نام پدر"}
                  {key === "GfatherName" && "نام پدر کلان"}
                  {key === "gender" && "جنسیت"}
                  {key === "birthDate" && "تاریخ تولد"}
                  {key === "birthPlace" && "محل تولد"}
                  {key === "residency" && "ناحیه سکونت در کابل"}
                  {key === "NIC" && "نمبر تذکره"}
                  {key === "nation" && "قوم"}
                  {key === "religion" && "دین"}
                  {key === "mode" && "حالت"}
                </label>
                {key === "gender" ? (
                  <select
                    name="gender"
                    value={wifeData[key]}
                    onChange={(e) =>
                      handleChange(
                        e,
                        setWifeData,
                        wifeData,
                        setWifeErrors,
                        wifeErrors
                      )
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="زن">زن</option>
                  </select>
                ) : key === "mode" ? (
                  <select
                    name="mode"
                    value={wifeData[key]}
                    onChange={(e) =>
                      handleChange(
                        e,
                        setWifeData,
                        wifeData,
                        setWifeErrors,
                        wifeErrors
                      )
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="خانم">خانم</option>
                  </select>
                ) : key === "residency" ? (
                  <select
                    name="residency"
                    value={wifeData[key]}
                    onChange={(e) =>
                      handleChange(
                        e,
                        setWifeData,
                        wifeData,
                        setWifeErrors,
                        wifeErrors,
                        true,
                        false
                      )
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">انتخاب کنید</option>
                    {[...Array(22)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={key === "birthDate" ? "date" : "text"}
                    name={key}
                    value={wifeData[key]}
                    onChange={(e) =>
                      handleChange(
                        e,
                        setWifeData,
                        wifeData,
                        setWifeErrors,
                        wifeErrors
                      )
                    }
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      wifeErrors[key] ? "border-red-500" : ""
                    }`}
                  />
                )}
                {wifeErrors[key] && (
                  <p className="text-red-500 text-xs italic">
                    {wifeErrors[key]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-dark-green-500 hover:bg-dark-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            ارسال
          </button>
        </div>
      </form>

      {modalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>{msg_success}</p>
            <button
              onClick={() => setModalVisible(false)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Record;
