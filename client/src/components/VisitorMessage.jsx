import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

function VisitorMessage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/user`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${baseUrl}/user/${id}`);
      setData(data.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div>
      <h2 className="mt-10 mb-4 text-xl font-bold">👥 Visitors Message</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          {/* Stylish Tailwind Spinner */}
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-gray-200 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border border-gray-100 transition-all duration-300 relative"
            >
              <button
                onClick={() => handleDeleteUser(item._id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {item.userName}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  📞 {item.mobileNumber}
                </p>
                {item.userComments && (
                  <p className="text-sm text-gray-600 italic mt-1">
                    💬 User Comments: {item.userComments}
                  </p>
                )}
              </div>

              <h4 className="text-md font-semibold text-gray-700 border-b pb-2 mb-3">
                🎓 Courses Enrolled
              </h4>
              <div className="grid sm:grid-cols-1 gap-2">
                {item.course.map((cour) => (
                  <motion.div
                    key={cour._id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                  >
                    <p className="text-sm text-gray-800">
                      <span className="font-semibold">Course:</span>{" "}
                      {cour.courseName}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-semibold">Duration:</span>{" "}
                      {cour.duration}
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-5 text-xs text-gray-400 border-t pt-2 text-right">
                ⏱ Last Updated: {new Date().toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VisitorMessage;
