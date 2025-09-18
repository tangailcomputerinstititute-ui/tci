import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
function DashboardCourse({ courses, handleDeleteCourse }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {courses.map((course) => (
        <motion.div
          key={course._id}
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border border-gray-100 relative"
        >
          <button
            onClick={() => handleDeleteCourse(course._id)}
            className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
          <h3 className="text-lg font-bold text-gray-800">
            {course.courseName}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            ⏳ Duration: {course.courseDuration}
          </p>

          {course.courseTitel?.length > 0 && (
            <div className="mt-3">
              <h4 className="text-sm font-semibold">Titles:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {course.courseTitel.map((t, i) => (
                  <li key={i}>{t.titelName}</li>
                ))}
              </ul>
            </div>
          )}

          {course.tags?.length > 0 && (
            <div className="mt-3">
              <h4 className="text-sm font-semibold">Tags:</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {course.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    #{tag.tagName}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default DashboardCourse;
