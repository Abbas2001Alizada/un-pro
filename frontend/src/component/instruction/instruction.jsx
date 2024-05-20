import { useState } from "react";
import FormComponent from "../newRequest/form-component";

function Instruction(openWindow) {
  const [isRWindowOpen, setIsRwindowOpen] = useState(false);
  const toggleIsRwindowOpen = () => {
    setIsRwindowOpen(!isRWindowOpen);
  };
  return (
    <div className="flex flex-col items-center p-8 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center" dir="rtl">
        مراحل اخذ نکاح خط  : 
      </h1>
      <ol className="list-decimal list-inside space-y-4 text-gray-700">
        <li>Both parties must be present at the time of registration.</li>
        <li>Bring valid identification documents (passport, ID card, etc.).</li>
        <li>
          Provide proof of residence (utility bill, lease agreement, etc.).
        </li>
        <li>Submit completed marriage registration forms.</li>
        <li>Provide two passport-sized photographs of each party.</li>
        <li>Bring a copy of the birth certificates of both parties.</li>
        <li>
          If previously married, provide proof of divorce or death certificate
          of the former spouse.
        </li>
        <li>
          Pay the applicable registration fee (check with local registry office
          for details).
        </li>
        <li>
          Schedule an appointment if required by the local registry office.
        </li>
        <li>
          Ensure all documents are in the original and photocopied versions.
        </li>
      </ol>

      <button
        onClick={toggleIsRwindowOpen}
        className="mt-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
       درخواست جدید برای اخد نکاح خط
      </button>
      {isRWindowOpen && <FormComponent />}
    </div>
  );
}
export default Instruction;
