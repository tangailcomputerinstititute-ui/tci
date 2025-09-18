import React, { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import AddressCard from "@/components/AddressCard";

function Question({
  handleSubmit,
  formData,
  setFormData,
  formMsg,
  Button,
  loading,
}) {
  const [courses, setCourses] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Fetch courses from backend
  useEffect(() => {
    fetch(`${baseUrl}/course`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto mt-4 py-16 bg-gradient-to-br from-[#c7ecee] to-[#a29bfe] rounded-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="bg-white px-8 py-4 rounded-lg shadow-md">
            <h2 className="text-3xl md:text-4xl font-bold">
              অ্যাডমিশন বা জিজ্ঞাসা?
            </h2>
            <p className="mt-3 text-slate-600">
              ফর্মটি পূরণ করুন, আমাদের টিম কল করবে।
            </p>

            <form
              className="mt-6 grid grid-cols-1 gap-4 max-w-md"
              onSubmit={handleSubmit}
            >
              <Input
                placeholder="আপনার নাম"
                required
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
              />

              <Input
                type="tel"
                placeholder="মোবাইল নম্বর"
                required
                value={formData.mobileNumber}
                onChange={(e) =>
                  setFormData({ ...formData, mobileNumber: e.target.value })
                }
              />

              {/* কোর্স ড্রপডাউন */}
              <select
                required
                value={formData.courseName}
                onChange={(e) =>
                  setFormData({ ...formData, courseName: e.target.value })
                }
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">-- কোন কোর্সে আগ্রহী? --</option>
                {courses.map((course) => (
                  <option key={course._id} value={course.courseName}>
                    {course.courseName}
                  </option>
                ))}
              </select>

              {/* সময়কাল ড্রপডাউন */}
              <select
                required
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">-- সময়কাল নির্বাচন করুন --</option>
                {courses.map((course) => (
                  <option key={course._id} value={course.courseDuration}>
                    {course.courseDuration}
                  </option>
                ))}
              </select>

              <textarea
                rows="5"
                placeholder="আপনার জিজ্ঞাসা বা ম্যাসেজ বিস্তারিত লিখুন"
                value={formData.userComments}
                onChange={(e) =>
                  setFormData({ ...formData, userComments: e.target.value })
                }
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>

              {formMsg && <span className="text-green-600">{formMsg}</span>}

              <Button type="submit" className="rounded-2xl">
                {loading ? "সাবমিটিং..." : "সাবমিট"}
              </Button>
            </form>
          </div>

          <AddressCard />
        </div>
      </div>
    </section>
  );
}

export default Question;
