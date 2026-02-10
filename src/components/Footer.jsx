import React from "react";
import { useNavigate } from "react-router-dom";


const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="bg-gradient-to-b from-[#061826] to-[#04131F] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Brand Logo</h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Professional engineering services for appliance repairs,
              installations, and setup. We serve both individuals and
              businesses with expert care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-[#0093FF] cursor-pointer" onClick={() => handleNavigation("/")}>Home</li>
              <li className="hover:text-[#0093FF] cursor-pointer">Services</li>
              <li className="hover:text-[#0093FF] cursor-pointer">About Us</li>
              <li className="hover:text-[#0093FF] cursor-pointer" onClick={() => handleNavigation("/contact")}>Contact</li>
            <li className="hover:text-[#0093FF] cursor-pointer" onClick={() => handleNavigation("/book")}>
                Book Appointment
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                📞 <span>07771096969</span>
              </li>
              <li className="flex items-center gap-2">
                ✉️ <span>info@bigdadcommunications.com</span>
              </li>
              <li className="flex items-center gap-2">
                📍 <span>47 Ocean Street, PL2 2DJ, Plymouth</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white mt-12 pt-6 text-center">
          <p className="text-xs text-gray-400">
            © 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
