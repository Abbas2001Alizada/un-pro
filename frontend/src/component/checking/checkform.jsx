import React, { useState } from "react";
const CheckFormButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [husbandName, setHusbandName] = useState("");
  const [husbandFatherName, setHusbandFatherName] = useState("");
  const [wifeName, setWifeName] = useState("");
  const [wifeFatherName, setWifeFatherName] = useState("");
  const [numberOfChildren, setNumberOfChildren] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle form submission, e.g., send data to a server
    console.log("Form submitted with data:", {
      husbandName,
      husbandFatherName,
      wifeName,
      wifeFatherName,
      numberOfChildren,
    });
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>چک فورم</button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4"> جستجوفورم</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm  mb-2"
                  htmlFor="husbandName"
                >
                  نام شوهر
                </label>
                <input
                  className=" text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="husbandName"
                  type="text"
                  placeholder="نام شوهر را وارد کنید"
                  value={husbandName}
                  onChange={(e) => setHusbandName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="text-sm block text-gray-700 mb-2"
                  htmlFor="husbandFatherName"
                >
                  نام پدر شوهر
                </label>
                <input
                  className="text-sm text-bold shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="husbandFatherName"
                  type="text"
                  placeholder="نام پدر شوهر را وارد کنید"
                  value={husbandFatherName}
                  onChange={(e) => setHusbandFatherName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm  mb-2"
                  htmlFor="wifeName"
                >
                  نام خانم
                </label>
                <input
                  className=" text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="wifeName"
                  type="text"
                  placeholder="نام خانم را وارد کنید"
                  value={wifeName}
                  onChange={(e) => setWifeName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm  mb-2"
                  htmlFor="wifeFatherName"
                >
                  نام پدر خانم
                </label>
                <input
                  className=" text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="wifeFatherName"
                  type="text"
                  placeholder="نام پدر خانم را وارد کنید"
                  value={wifeFatherName}
                  onChange={(e) => setWifeFatherName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm  mb-2"
                  htmlFor="numberOfChildren"
                >
                  تعداد فرزندان
                </label>
                <input
                  className=" text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="numberOfChildren"
                  type="number"
                  placeholder="تعداد فرزندان را وارد کنید"
                  value={numberOfChildren}
                  onChange={(e) => setNumberOfChildren(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  جستجو
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setIsOpen(false)}
                >
                  لغو
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckFormButton;
