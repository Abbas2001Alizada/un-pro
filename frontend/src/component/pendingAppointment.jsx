import React from 'react';
import { useLocation } from 'react-router-dom';

const PendingAppointment = () => {
  const Location=useLocation();
  const {Id,familyCode}=Location.state;
  let familyId=Id;
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-950">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl mb-4 text-red-500">وقت ملاقات هنوز مشخص نیست</h2>
        <p className="text-gray-600">لطفاً بعداً دوباره بررسی کنید.</p>
        <p className="text-gray-600">id :{familyId}</p>
        <p className="text-gray-600">کود فامیل :{familyCode}</p>
      </div>
    </div>
  );
};

export default PendingAppointment;
