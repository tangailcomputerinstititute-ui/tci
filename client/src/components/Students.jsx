import React, { useEffect, useState } from "react";

function Students() {
  const [students, setStudents] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // ফেচ স্টুডেন্টস
  useEffect(() => {
    fetch(`${baseUrl}/student`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, [baseUrl]);

  // ডিলিট ফাংশন
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      const res = await fetch(`${baseUrl}/student/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setStudents(students.filter((s) => s._id !== id));
      } else {
        console.error("Failed to delete student");
      }
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Students List</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={student.studentImageUrl}
              alt={student.studentName}
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold">{student.studentName}</h3>
            <p className="text-sm text-gray-600">{student.courseName}</p>
            <p className="text-sm text-gray-600">
              Duration: {student.courseDuration}
            </p>
            <p className="text-sm text-gray-600">📞 {student.studentMobile}</p>
            <p className="text-sm text-gray-500">
              {new Date(student.admissionDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">{student.address}</p>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(student._id)}
              className="mt-3 px-4 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Students;
