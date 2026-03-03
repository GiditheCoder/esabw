import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "../images/menu.png";
import { AnimatePresence, motion } from "framer-motion";
import { Menu as LucideMenu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust for navbar height
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
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full
          ${isScrolled ? "bg-[#041725]/95 backdrop-blur-lg shadow-xl py-4" : "bg-transparent py-6"}
          border-b border-white/10 px-6 md:px-12 flex items-center justify-between`}
      >
        <div
          onClick={() => {
            if (location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              navigate("/");
            }
          }}
          className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Big Dad Communications Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-white font-bold text-xl md:text-2xl tracking-tight">
            Bigdad <span className="text-[#0093FF]">Communications WORLD</span>
          </span>
        </div>

        <ul className="hidden lg:flex items-center gap-10 text-white font-semibold text-sm uppercase tracking-widest">
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
              onClick={() => navigate("/gallery")}
              className="hover:text-[#0093FF] transition-colors"
            >
              Gallery
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
              onClick={() => scrollToSection("about")}
              className="hover:text-[#0093FF] transition-colors"
            >
              About us
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
        </ul>

        <div className="hidden md:block">
          <button
            onClick={() => navigate("/book")}
            className="bg-[#0093FF] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-[#007cd6] hover:shadow-[0_0_20px_rgba(0,147,255,0.4)] transition-all active:scale-95"
          >
            Book Now
          </button>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isMenuOpen ? <X size={30} /> : <LucideMenu size={30} />}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 bg-[#041725]/98 backdrop-blur-xl border-t border-white/10 p-8 lg:hidden flex flex-col gap-6 z-50 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-white text-xl font-bold text-left border-b border-white/5 pb-4 uppercase tracking-widest"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/gallery");
                }}
                className="text-white text-xl font-bold text-left border-b border-white/5 pb-4 uppercase tracking-widest"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-white text-xl font-bold text-left border-b border-white/5 pb-4 uppercase tracking-widest"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-white text-xl font-bold text-left border-b border-white/5 pb-4 uppercase tracking-widest"
              >
                About us
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/contact");
                }}
                className="text-white text-xl font-bold text-left border-b border-white/5 pb-4 uppercase tracking-widest"
              >
                Contact
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/book");
                }}
                className="bg-[#0093FF] text-white py-5 rounded-2xl font-bold text-center text-lg shadow-xl shadow-blue-500/20 active:scale-95 transition-transform"
              >
                BOOK APPOINTMENT
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
