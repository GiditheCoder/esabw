import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../images/menu.png";
import Close from "../images/CloseIcon.png";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed z-100 inset-x-4 top-4 flex items-center justify-between border rounded-xl px-6 py-2 transition-all duration-300 ${
        isScrolled
          ? "bg-black border-gray-700"
          : "bg-white/10 backdrop-blur-md border-white"
      }`}
    >
      <Link to={"/"} className="flex items-center gap-2">
        <img
          src="/logo.png"
          className="size-12 object-contain"
          alt="Big Dad Communications World Logo"
        />
        <span className="font-medium text-lg leading-3 tracking-widest">
          Big Dad
          <br />
          <span className="font-light text-sm">Communications World</span>
        </span>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-sm text-white">
        <li
          onClick={() => navigate("/")}
          className="cursor-pointer font-medium hover:text-[#0093FF] transition"
        >
          Home
        </li>
        <li className="cursor-pointer opacity-90 hover:text-[#0093FF] transition">
          Services
        </li>
        <li className="cursor-pointer opacity-90 hover:text-[#0093FF] transition">
          About us
        </li>
        <li
          onClick={() => navigate("/contact")}
          className="cursor-pointer opacity-90 hover:text-[#0093FF] transition"
        >
          Contact
        </li>
      </ul>

      {/* Mobile Menu Icon */}
      <img
        src={menuOpen ? Close : Menu}
        alt="menu"
        className="w-6 h-6 cursor-pointer md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      />

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 mt-4 w-full rounded-xl bg-black/90 backdrop-blur-md md:hidden">
          <ul className="flex flex-col items-center gap-6 py-6 text-sm">
            <li onClick={() => navigate("/")} className="cursor-pointer">
              Home
            </li>
            <li className="cursor-pointer">Services</li>
            <li className="cursor-pointer">About us</li>
            <li onClick={() => navigate("/contact")} className="cursor-pointer">
              Contact
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
