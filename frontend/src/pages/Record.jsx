import React, { useEffect, useState } from "react";
import LoadingOverlay from "../component/LoadingOverlay.jsx"; // Import the LoadingOverlay component
import axios from "axios";

const Record = () => {
  const [husbandData, setHusbandData] = useState({
    Name: "",
    lastName: "",
    fatherName: "",
    GfatherName: "",
    gender: "مرد",
    birthDate: "",
    birthPlace: "",
    residency: "",
    NIC: "",
    nation: "",
    religion: "",
    state: "",
  });

  const [wifeData, setWifeData] = useState({
    Name: "",
    lastName: "",
    fatherName: "",
    GfatherName: "",
    gender: "زن",
    birthDate: "",
    birthPlace: "",
    residency: "",
    NIC: "",
    nation: "",
    religion: "",
    state: "",
  });

  const [loading, setLoading] = useState(false);

  const handleHusbandChange = (e) => {
    const { name, value } = e.target;
    setHusbandData({ ...husbandData, [name]: value });
  };

  const handleWifeChange = (e) => {
    const { name, value } = e.target;
    setWifeData({ ...wifeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // console.log(response.data);
   const response = await axios.post('http://localhost:8038/records', husbandData);
      console.log('record submitted:',husbandData);

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-950 relative">
      <LoadingOverlay loading={loading} />{" "}
      {/* Include the LoadingOverlay component */}
      <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
        <div className="bg-dark-red-800 text-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl mb-4 text-center">اطلاعات شوهر</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">نام:</label>
              <input
                type="text"
                name="Name"
                value={husbandData.Name}
                onChange={handleHusbandChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">
                نام خانوادگی:
              </label>
              <input
                type="text"
                name="lastName"
                value={husbandData.lastName}
                onChange={handleHusbandChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">نام پدر:</label>
              <input
                type="text"
                name="fatherName"
                value={husbandData.fatherName}
                onChange={handleHusbandChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">
                نام پدربزرگ:
              </label>
              <input
                type="text"
                name="GfatherName"
                value={husbandData.GfatherName}
                onChange={handleHusbandChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">جنسیت:</label>
              <select
                name="gender"
                value={husbandData.gender}
                onChange={handleHusbandChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="مرد">مرد</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">
                تاریخ تولد:
              </label>
              <input
                type="date"
                name="birthDate"
                value={husbandData.birthDate}
                onChange={handleHusbandChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">محل تولد:</label>
              <input
                type="text"
                name="birthPlace"
                value={husbandData.birthPlace}
                onChange={handleHusbandChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">محل اقامت:</label>
              <input
                type="text"
                name="residency"
                value={husbandData.residency}
                onChange={handleHusbandChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">کد ملی:</label>
              <input
                type="text"
                name="NIC"
                value={husbandData.NIC}
                onChange={handleHusbandChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">ملیت:</label>
              <input
                type="text"
                name="nation"
                value={husbandData.nation}
                onChange={handleHusbandChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">دین:</label>
              <input
                type="text"
                name="religion"
                value={husbandData.religion}
                onChange={handleHusbandChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">استان:</label>
              <input
                type="text"
                name="state"
                value={husbandData.state}
                onChange={handleHusbandChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        <div className="bg-dark-red-800 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 text-center">اطلاعات زن</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">نام:</label>
              <input
                type="text"
                name="name"
                value={wifeData.name}
                onChange={handleWifeChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">
                نام خانوادگی:
              </label>
              <input
                type="text"
                name="lastName"
                value={wifeData.lastName}
                onChange={handleWifeChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">نام پدر:</label>
              <input
                type="text"
                name="fatherName"
                value={wifeData.fatherName}
                onChange={handleWifeChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">
                نام پدربزرگ:
              </label>
              <input
                type="text"
                name="grandFatherName"
                value={wifeData.grandFatherName}
                onChange={handleWifeChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">جنسیت:</label>
              <select
                name="gender"
                value={wifeData.gender}
                onChange={handleWifeChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="زن">زن</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">
                تاریخ تولد:
              </label>
              <input
                type="date"
                name="birthDate"
                value={wifeData.birthDate}
                onChange={handleWifeChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">محل تولد:</label>
              <input
                type="text"
                name="birthPlace"
                value={wifeData.birthPlace}
                onChange={handleWifeChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">محل اقامت:</label>
              <input
                type="text"
                name="residency"
                value={wifeData.residency}
                onChange={handleWifeChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">کد ملی:</label>
              <input
                type="text"
                name="NIC"
                value={wifeData.NIC}
                onChange={handleWifeChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">ملیت:</label>
              <input
                type="text"
                name="nation"
                value={wifeData.nation}
                onChange={handleWifeChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">دین:</label>
              <input
                type="text"
                name="religion"
                value={wifeData.religion}
                onChange={handleWifeChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">استان:</label>
              <input
                type="text"
                name="state"
                value={wifeData.state}
                onChange={handleWifeChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
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
    </div>
  );
};

export default Record;
