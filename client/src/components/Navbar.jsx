import React from "react";
import Logo from "../img/logo.jpeg";
import { Link } from "react-router-dom";
function Navbar({ siteName, Button }) {
  // ================Site Info==================

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <a href="#" className="flex items-center gap-2 font-bold text-xl">
        <img src={Logo} alt="TCI" className="h-8 w-8" />
        <span className="text-sm md:text-2xl">{siteName}</span>
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#courses" className="hover:text-slate-700">
          কোর্স
        </a>
        <a href="#why" className="hover:text-slate-700">
          কেন আমরা
        </a>
        <a href="#schedule" className="hover:text-slate-700">
          শিডিউল
        </a>
        <a href="#contact" className="hover:text-slate-700">
          যোগাযোগ
        </a>
        <Link to="/register" className="hover:text-slate-700">
          রেজিস্টার
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <Button className="py-1 rounded-2xl text-xs md:text-md">
          ডেমো ক্লাস
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
