import React, { useState } from 'react';
import PopupWindow from './checkForm';

const CheckFormButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="">
      <button
        className=""
        onClick={handleOpenPopup}
      >
     جستجو
      </button>

      {isPopupOpen && <PopupWindow onClose={handleClosePopup} />}
    </div>
  );
};

export default CheckFormButton;