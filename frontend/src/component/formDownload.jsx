// src/MarriageForm.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const FormDownload = ({ familyId }) => {
  const [id, setid] = useState(familyId);
  const [formData, setFormData] = useState({
    groomName: "",
    groomFatherName: "",
    groomAddress: "",
    brideName: "",
    brideFatherName: "",
    brideAddress: "",
  });

  useEffect(() => {
    // Fetch form data from your API
    const fetchData = async () => {
      try {
console.log(id);
        const specification=await axios.post("http://localhost:8038/records/getName",{id})
setFormData({
    groomName:specification.data[0].Name,
    groomFatherName:specification.data[0].fatherName,
    groomAddress:specification.data[0].residency,
    brideName:specification.data[0].Name,
    brideFatherName:specification.data[0].fatherName,
    brideAddress:specification.data[0].residency,
  })
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDownloadPDF = async () => {
    const input = document.getElementById("form-content");
    const canvas = await html2canvas(input, {
      scale: 2,
      width: 900,
      height: 620,
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
    <div dir="rtl" className="form-container flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <div
        id="form-content"
        className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">درخواست نکاح</h2>
          <h3 className="text-xl font-semibold">شهرت درخواست کنندگان</h3>
        </div>
        <p className="mb-4">به مقام محترم محکمه وثایق شهر کابل</p>
        <p className="mb-4">
          ما دو نفر هر یک {formData.groomName} ولد {formData.groomFatherName}{" "}
          ولدیت {formData.groomFatherName} باشنده {formData.groomAddress} و{" "}
          {formData.brideName} ولد {formData.brideFatherName} ولدیت{" "}
          {formData.brideFatherName} باشنده {formData.brideAddress} در حال داشتن
          اهلیت کامل حقوقی به رضا و رغبت خود میخواهیم ازدواج نماییم، خواهشمندیم
          در طی مراحل و توثیق عقد نکاح ما به شعبه مربوط خویش هدایت فرمایید.
        </p>
        <p className="mb-4">محل امضا درخواست کنندگان: ..................</p>
        <p className="mb-4">
          فورم هذا به منظور طی مراحل به مراجع مربوط ارسال گردید.
        </p>
        <p className="mb-4">
          محل امضا رئیس محکمه یا آمر اداره ثبت و اسناد و وثایق:
          ..................
        </p>
        <p className="mb-4">
          تصدیق اهالی گذر: با درخواست کنندگان معرفت کامل داریم و در ازدواج شان
          موانع شرعی و قانونی وجود نداریم. در صورت خلاف مسوول و جوابده میباشیم.
        </p>
        <p className="mb-4">
          محل امضا و اثر انگشت سه نفر از همجواران و ملا امام مسجد:
          ..................
        </p>
        <p className="mb-4">
          تصدیق وکیل گذر یا قریه‌دار: از تحریر فوق اهالی و ملا امام مسجد تصدیق
          است. محل مهر: ..................
        </p>
        <p className="mb-4">
          تصدیق اداره محل (ناحیه یا ولسوالی): از برحالی وکیل گذر یا قریه‌دار
          تصدیق است. محل مهر: ..................
        </p>
        <p className="mb-4">
          شعبه مربوطه: نکاحنامه مطلوبه را اجرا نمایند. محل امضا رئیس محکمه یا
          آمر اسناد و وثایق: ..................
        </p>
      </div>
      <button
        onClick={handleDownloadPDF}
        className="mt-8 px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
      >
        Download Form Data as PDF
      </button>
    </div>
  );
};

export default FormDownload;
