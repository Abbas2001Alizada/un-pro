import React, { useState } from 'react';

const FormComponent = () => {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    children: '',
    spouseFatherName: '',
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
            <h2 className="text-xl font-semibold mb-4">Stage 1: Personal Information</h2>
            <label className="block mb-2">
              First Name:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2">
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Stage 2: Parents Information</h2>
            <label className="block mb-2">
              Father's Name:
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2">
              Mother's Name:
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Stage 3: Spouse and Children Information</h2>
            <label className="block mb-2">
              Spouse Name:
              <input
                type="text"
                name="spouseName"
                value={formData.spouseName}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2">
              Spouse's Father Name:
              <input
                type="text"
                name="spouseFatherName"
                value={formData.spouseFatherName}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2">
              Number of Children:
              <input
                type="number"
                name="children"
                value={formData.children}
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
          <li className={`py-2 px-4 rounded-md ${stage === 1 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Stage 1</li>
          <li className={`py-2 px-4 rounded-md ${stage === 2 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Stage 2</li>
          <li className={`py-2 px-4 rounded-md ${stage === 3 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Stage 3</li>
        </ul>
        <li>Just for tesing </li>
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

export default FormComponent;
