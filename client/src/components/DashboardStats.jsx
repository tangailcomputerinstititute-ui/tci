import { motion } from "framer-motion";
import {
  MessageCircle,
  BookOpen,
  Users,
  GraduationCap,
  UserCog,
} from "lucide-react";

export default function DashboardStats({
  data,
  courses,
  teachers,
  students,
  admins,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {/* Visitor Message */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="rounded-2xl shadow p-6 bg-sky-500 text-white flex items-center justify-between"
      >
        <div>
          <h3 className="text-lg font-semibold">Total Visitor Message</h3>
          <p className="text-3xl font-bold mt-2">{data.length}</p>
        </div>
        <MessageCircle className="w-12 h-12 opacity-80" />
      </motion.div>

      {/* Courses */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-rose-500 text-white rounded-2xl shadow p-6 flex items-center justify-between"
      >
        <div>
          <h3 className="text-lg font-semibold">Total Courses</h3>
          <p className="text-3xl font-bold mt-2">{courses.length}</p>
        </div>
        <BookOpen className="w-12 h-12 opacity-80" />
      </motion.div>

      {/* Teachers */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-purple-500 text-white rounded-2xl shadow p-6 flex items-center justify-between"
      >
        <div>
          <h3 className="text-lg font-semibold">Total Teacher</h3>
          <p className="text-3xl font-bold mt-2">{teachers.length}</p>
        </div>
        <Users className="w-12 h-12 opacity-80" />
      </motion.div>

      {/* Students */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-amber-500 text-white rounded-2xl shadow p-6 flex items-center justify-between"
      >
        <div>
          <h3 className="text-lg font-semibold">Total Students</h3>
          <p className="text-3xl font-bold mt-2">{students.length}</p>
        </div>
        <GraduationCap className="w-12 h-12 opacity-80" />
      </motion.div>

      {/* Admins */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-green-500 text-white rounded-2xl shadow p-6 flex items-center justify-between"
      >
        <div>
          <h3 className="text-lg font-semibold">Total Admin</h3>
          <p className="text-3xl font-bold mt-2">{admins.length}</p>
        </div>
        <UserCog className="w-12 h-12 opacity-80" />
      </motion.div>
    </div>
  );
}
