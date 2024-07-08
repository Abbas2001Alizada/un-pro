import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reporting = () => {
  const [timeRange, setTimeRange] = useState('today');
  const [reportData, setReportData] = useState({ pending: 0, processing: 0, done: 0 });

  useEffect(() => {
    fetchReportData();
  }, [timeRange]);

  const fetchReportData = async () => {
    try {
      const response = await axios.get(`http://localhost:8038/appointment/report`, {
        params: { timeRange },
      });
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const data = {
    labels: ['انتظار', 'پروسس', 'تکمیل'],
    datasets: [
      {
        label: 'Appointments',
        data: [reportData.pending, reportData.processing, reportData.done],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl mb-4">گزارش ملاقات</h2>

      <Bar data={data} />
      <div className="mt-4 text-center">
        <p>انتظار {reportData.pending}</p>
        <p>پروسس {reportData.processing}</p>
        <p>تکمیل {reportData.done}</p>
      </div>
    </div>
  );
};

export default Reporting;
