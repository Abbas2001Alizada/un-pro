import { useState } from "react";
import NewRequest from "../newRequest/form-component";

function Instruction(openWindow) {
  const [isRWindowOpen, setIsRwindowOpen] = useState(false);
  const toggleIsRwindowOpen = () => {
    setIsRwindowOpen(!isRWindowOpen);
  };
  return (
    <div className="flex flex-col items-center p-8 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1
        className="text-3xl font-bold mb-6 text-gray-800 flex items-center"
        dir="rtl"
      >
        مراحل اخذ نکاح خط :
      </h1>
      <ol className=" items-start list-decimal  space-y-4 text-gray-700" dir="rtl">
        <li className="it">
          جمع‌آوری مدارک لازم: شناسنامه کارت ملی عکس پرسنلی فرم درخواست گذرنامه
        </li>
        <li>
          پر کردن فرم درخواست: اطلاعات شخصی اطلاعات تماس اطلاعات محل سکونت
        </li>
        <li>
          رزرو وقت از اداره گذرنامه: مراجعه به وب‌سایت اداره گذرنامه انتخاب زمان
          و تاریخ مناسب تایید وقت رزرو شده
        </li>
        <li>
          پرداخت هزینه‌ها: هزینه صدور گذرنامه هزینه عکاسی (در صورت نیاز) هزینه
          پستی (در صورت نیاز)
        </li>
        <li>
          مراجعه به اداره گذرنامه: به همراه داشتن تمامی مدارک و رسید پرداخت حضور
          در تاریخ و ساعت تعیین شده
        </li>
        <li>
          تحویل مدارک و انجام مراحل بیومتریک: ارائه مدارک به کارشناس مربوطه
          انجام اسکن اثر انگشت و عکس‌برداری
        </li>
        <li>
          پیگیری وضعیت درخواست: مراجعه به وب‌سایت اداره گذرنامه وارد کردن کد
          رهگیری بررسی وضعیت صدور گذرنامه
        </li>

      </ol>

      <button
        onClick={toggleIsRwindowOpen}
        className="mt-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        درخواست جدید برای اخد نکاح خط
      </button>
      {isRWindowOpen && <NewRequest />}
    </div>
  );
}
export default Instruction;
