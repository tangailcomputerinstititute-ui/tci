import React, { useEffect, useState } from "react";
import TeacherForm from "./TeacherForm";
import { FaTrash } from "react-icons/fa"; // Trash Icon

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/teacher`);

      if (!res.ok) {
        console.error("Fetch error:", res.status, res.statusText);
        setTeachers([]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setTeachers(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setTeachers([]);
      setLoading(false);
    }
  };

  const deleteTeacher = async (id) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;

    try {
      const res = await fetch(`${baseUrl}/teacher/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.error("Delete failed:", res.status, res.statusText);
        return;
      }

      // refresh list after delete
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [baseUrl]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className=" mx-auto mt-10">
      {/* Header */}
      <div className="flex flex-row items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-center">Teachers List</h2>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Add Teacher
        </button>
      </div>

      {/* Teacher Cards or Empty State */}
      {teachers.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <svg
            className="w-24 h-24 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <p className="text-gray-500 text-lg mb-4">No teachers found.</p>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Add your first teacher
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher._id}
              className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center text-center relative"
            >
              {/* Delete Button */}
              <button
                onClick={() => deleteTeacher(teacher._id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
              >
                <FaTrash />
              </button>

              {teacher.teacherImageUrl && (
                <img
                  src={teacher.teacherImageUrl}
                  alt={teacher.teacherName}
                  className="w-32 h-32 object-cover rounded-full border mb-4"
                />
              )}
              <h3 className="text-lg font-semibold">{teacher.teacherName}</h3>
              <p className="text-sm text-gray-500">{teacher.selectedCourse}</p>
              <p className="mt-2 text-gray-600">{teacher.descriptions}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg relative">
            {/* Close button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <TeacherForm
              onSuccess={() => {
                setOpenModal(false);
                fetchTeachers();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
