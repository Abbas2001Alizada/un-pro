import React from 'react';

const ProcessingAppointment = ({ appointmentTime }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl mb-4">لطفاً در زمان تعیین شده به مرکز بیایید</h2>
        <p className="text-gray-600">زمان ملاقات شما: {appointmentTime}</p>
      </div>
    </div>
  );
};

export default ProcessingAppointment;
