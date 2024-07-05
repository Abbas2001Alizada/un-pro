import React from 'react';
import { useLocation } from 'react-router-dom';

const ProcessingAppointment = () => {
  const Location=useLocation();
  const {appointmentTime,state}=Location.state;
  let time=appointmentTime;;
  time=time.split('T')[0];
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl mb-4">لطفاً در زمان تعیین شده به مرکز بیایید</h2>
        <p className="text-gray-600">زمان ملاقات شما: {time}</p>
      </div>
    </div>
  );
};

export default ProcessingAppointment;
