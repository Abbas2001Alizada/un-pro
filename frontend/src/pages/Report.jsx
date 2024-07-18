import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  const handleDownloadPDF = async () => {
    const input = document.getElementById("form-content");
    const canvas = await html2canvas(input, {
      scale: 2,
      width:700,
      height: 200,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("marriage-form.pdf");
  };

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl mb-4">گزارش ملاقات</h2>

      <Bar data={data} />
      <div id='form-content' className="mt-4 ">
        <p className='text-xl'>گزارش سیستم به شکل کلی قرار ذیل است.</p>
        <p>به تعداد: <span className='text-red-400'>{reportData.pending}</span> فامیل معلومات شان ثبت گردیده و اماده است تا نوبت دریافت نموده پروسه اخد نکاح خط خویش را طی مراحل نمایند </p>
        <p>به تعداد:<span className='text-blue-500'>{reportData.processing}</span> فامیل از طرف سیستم نوبت اخذ نموده و آماده طی مراحل است.</p>
        <p>به تعداد:<span className='text-green-500'>{reportData.done}</span> فامیل نکاح خط خویش را اخد نموده اند.</p>
      </div><div className=' text-center'>
      <button className='bg-green-500 text-white rounded p-1' onClick={handleDownloadPDF}>دانلود گزارش</button>
    </div></div>
  );
};

export default Reporting;
