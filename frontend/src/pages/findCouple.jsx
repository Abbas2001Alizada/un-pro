import React, { useState } from "react";
import axios from "axios";

const SendToDatabase = () => {
  const [Name, setName] = useState("");
  const [NIC, setNIC] = useState("");
  const [records, setRecords] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mode = "شوهر";

    try {
      const response = await axios.post(
        "http://localhost:8038/records/findFamily",
        {
          Name,
          NIC,
          mode,
        }
      );

      // Handle success response
      setRecords(response.data);
      console.log("Data received successfully:", response.data);
    } catch (error) {
      // Handle error response
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 justify-center bg-red-950 relative">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-red-600 text-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white"
          >
            نام شوهر
          </label>
          <input
            type="text"
            id="name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 block w-full text-black rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="NIC" className="block text-sm font-medium text-white">
            نمبر تذکره
          </label>
          <input
            type="text"
            id="NIC"
            value={NIC}
            onChange={(e) => setNIC(e.target.value)}
            required
            className="mt-1 p-2 block w-full text-black rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          ارسال
        </button>
      </form>

      {records && (
        <div className="mt-8">
          <Table
            person={records.hname}
            fatherName={records.hfathername}
            NIC={records.hNIC}
            mode={records.hmode}
          />
          <Table
            person={records.wname}
            fatherName={records.wfathername}
            NIC={records.wNIC}
            mode={records.wmode}
          />
          {records.Witname && (
            <Table
              person={records.Witname}
              fatherName={records.Witfathername}
              NIC={records.WitNIC}
              mode={records.Witmode}
            />
          )}
          {records.Wit1name && (
            <Table
              person={records.Wit1name}
              fatherName={records.Wit1fathername}
              NIC={records.Wit1NIC}
              mode={records.Wit1mode}
            />
          )}
        </div>
      )}
    </div>
  );
};

const Table = ({ person, fatherName, NIC, mode }) => (
  <table className="min-w-full bg-white my-4">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b">نام</th>
        <th className="py-2 px-4 border-b">نام پدر</th>
        <th className="py-2 px-4 border-b">نمبر تذکره</th>
        <th className="py-2 px-4 border-b">عنوان</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="py-2 px-4 border-b">{person}</td>
        <td className="py-2 px-4 border-b">{fatherName}</td>
        <td className="py-2 px-4 border-b">{NIC}</td>
        <td className="py-2 px-4 border-b">{mode}</td>
      </tr>
    </tbody>
  </table>
);

export default SendToDatabase;
