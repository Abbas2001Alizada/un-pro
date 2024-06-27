import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8038/appointment');
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        setError('خطا در دریافت اطلاعات');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="text-center text-white">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-950 p-4">
      <div className="w-full max-w-4xl bg-red-700 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4 text-center text-white">گزارش ملاقات‌ها</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-300">شناسه ملاقات</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">نام کاربر</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">تاریخ</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">زمان</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="py-2 px-4 border-b border-gray-300">{appointment.id}</td>
                <td className="py-2 px-4 border-b border-gray-300">{appointment.username}</td>
                <td className="py-2 px-4 border-b border-gray-300">{appointment.date}</td>
                <td className="py-2 px-4 border-b border-gray-300">{appointment.time}</td>
                <td className={`py-2 px-4 border-b border-gray-300 ${appointment.status === 'موفق' ? 'text-green-500' : 'text-red-500'}`}>
                  {appointment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
