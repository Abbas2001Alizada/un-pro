import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-red-950 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="flex items-center mb-2">
            <span className="mr-2">Phone Number:</span> (123) 456-7890
          </p>
          <p className="flex items-center mb-2">
            <span className="mr-2">Location:</span> 123 Main St, Anytown, USA
          </p>
          <p className="flex items-center mb-2">
            <span className="mr-2">Email:</span>
            <a href="mailto:example@gmail.com" className="text-blue-200 hover:underline">
              example@gmail.com
            </a>
          </p>
          <p className="flex items-center mb-2">
            <span className="mr-2">YouTube:</span>
            <a href="https://www.youtube.com/channel/UCXXXXXXX" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:underline">
              Our Channel
            </a>
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-semibold mb-4">Objections</h2>
          <p>If you have any objections or concerns, please contact us via phone or email.</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4">
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-white hover:text-blue-200">Facebook</a>
          <a href="#" className="text-white hover:text-blue-200">Twitter</a>
          <a href="#" className="text-white hover:text-blue-200">Instagram</a>
        </div>
        <p className="text-center text-sm mt-4">&copy; 2024 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
