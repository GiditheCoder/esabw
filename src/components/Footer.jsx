import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-[#041725] text-white pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <div
              onClick={() => {
                if (location.pathname === "/")
                  window.scrollTo({ top: 0, behavior: "smooth" });
                else navigate("/");
              }}
              className="text-2xl font-bold mb-6 flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Big Dad Communications Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="leading-tight">
                Bigdad <span className="text-[#0093FF]">Communications</span>{" "}
                WORLD
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
              Professional engineering services for appliance repairs,
              installations, and solar setup. We serve both individuals and
              businesses with expert care.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <button
                  onClick={() => {
                    if (location.pathname === "/")
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    else navigate("/");
                  }}
                  className="hover:text-[#0093FF] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-[#0093FF] transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/gallery")}
                  className="hover:text-[#0093FF] transition-colors"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-[#0093FF] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="hover:text-[#0093FF] transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/book")}
                  className="hover:text-[#0093FF] transition-colors"
                >
                  Book Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-bold text-lg mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0093FF]/10">
                  <Phone size={18} className="text-[#0093FF]" />
                </div>
                <a
                  href="tel:08039424024"
                  className="hover:text-[#0093FF] transition-colors"
                >
                  0803 942 4024
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0093FF]/10">
                  <Mail size={18} className="text-[#0093FF]" />
                </div>
                <a
                  href="mailto:bigdad_2k2@yahoo.com"
                  className="hover:text-[#0093FF] transition-colors"
                >
                  bigdad_2k2@yahoo.com
                </a>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0093FF]/10 shrink-0">
                  <MapPin size={18} className="text-[#0093FF]" />
                </div>
                <span className="pt-2">
                  Shop 5, Block D Abattoir Shopping Complex, Abattoir Bus Stop,
                  Agege, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0093FF]/10">
                  <Facebook size={18} className="text-[#0093FF]" />
                </div>
                <a
                  href="https://web.facebook.com/bigdadsolar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0093FF] transition-colors"
                >
                  Follow us on Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Bigdad Communications WORLD. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://web.facebook.com/bigdadsolar"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#0093FF]/20 transition-colors"
            >
              <Facebook
                size={18}
                className="text-gray-400 hover:text-[#0093FF]"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
