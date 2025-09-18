import React, { useEffect, useState } from "react";

import { Search, Trash2, Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import CourseForm from "../components/CourseForm";
import { Outlet, useLocation } from "react-router-dom";
import DashboardStats from "@/components/DashboardStats";
import DashboardCourse from "@/components/DashboardCourse";

export default function Admin({ onLogout }) {
  const [data, setData] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const adminNameLocal = localStorage.getItem("adminName");
  useEffect(() => {
    fetchUsers();
    fetchCourses();
    fetchStudens();
    fetchTeachers();
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await fetch(`${baseUrl}/admin`);
      const json = await res.json();
      setAdmins(json);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${baseUrl}/user`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  const fetchStudens = async () => {
    try {
      const res = await fetch(`${baseUrl}/student`);
      const json = await res.json();
      setStudents(json);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  const fetchTeachers = async () => {
    try {
      const res = await fetch(`${baseUrl}/teacher`);
      const json = await res.json();
      setTeachers(json);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await fetch(`${baseUrl}/course`);
      const json = await res.json();
      setCourses(json);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  // Delete course
  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`${baseUrl}/course/${id}`);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  // Modal control
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCourseAdded = (newCourse) => {
    setCourses([newCourse, ...courses]);
    closeModal();
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg w-full md:w-1/3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-200"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div className="hidden sm:flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium capitalize">{adminNameLocal}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 flex-1">
          {/* Stats */}
          <DashboardStats
            data={data}
            courses={courses}
            teachers={teachers}
            students={students}
            admins={admins}
          />
          <div
            className={`${
              location.pathname === "/admin"
                ? "block"
                : location.pathname.startsWith("/admin/")
                ? "hidden"
                : "block"
            }`}
          >
            {/* Courses Section */}
            <div className="mt-10">
              <h2 className="mb-4 text-xl font-bold flex justify-between items-center">
                📚 All Courses
                <button
                  onClick={openModal}
                  className="px-4 py-2 text-sm bg-sky-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
                >
                  Add Course
                </button>
              </h2>
              <DashboardCourse
                courses={courses}
                handleDeleteCourse={handleDeleteCourse}
              />
            </div>
          </div>
          <Outlet />
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed bg-gray-300 bg-opacity-30 inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>
            <CourseForm onSubmitSuccess={handleCourseAdded} />
          </div>
        </div>
      )}
    </div>
  );
}
