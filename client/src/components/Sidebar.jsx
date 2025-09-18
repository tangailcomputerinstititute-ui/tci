import React from "react";
import {
  Home,
  Users,
  BarChart,
  Settings,
  LogOut,
  X,
  GraduationCap,
  Mail,
  Images,
} from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar({ onLogout, isOpen, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={onClose}></div>
      )}

      <aside
        className={`fixed md:relative z-50 w-64 bg-gray-900 text-gray-100 flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex`}
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-center">
          <Link to="/admin" className="text-2xl font-bold tracking-wide">
            Admin Panel
          </Link>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 px-4">
          <Link
            to="/admin"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
          >
            <Home size={20} /> Dashboard
          </Link>

          <Link
            to="/admin/students"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
          >
            <Users size={20} /> Students
          </Link>

          <Link
            to="/admin/teachers"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
          >
            <GraduationCap size={20} /> Teachers
          </Link>

          <Link
            to="/admin/message"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
          >
            <Mail size={20} /> Visitor Message
          </Link>
          <Link
            to="/admin/slides"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
          >
            <Images size={20} /> Slides
          </Link>

          <Link
            to="/admin/settings"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700"
          >
            <Settings size={20} /> Settings
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-700"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
