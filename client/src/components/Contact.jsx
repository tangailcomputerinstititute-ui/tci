import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Logo from "../img/logo.jpeg";
import { Link } from "react-router-dom";
function Contact() {
  const [formMsg, setFormMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    userName: "",
    mobileNumber: "",
    userComments: "",
    courseName: "",
    duration: "",
  });
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Fetch courses from backend
  useEffect(() => {
    fetch(`${baseUrl}/course`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      userName: formData.userName,
      mobileNumber: formData.mobileNumber,
      userComments: formData.userComments,
      course: [
        {
          courseName: formData.courseName,
          duration: formData.duration,
        },
      ],
    };

    fetch(`${baseUrl}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setFormMsg(data.message);
        setTimeout(() => setFormMsg(""), 2000);
        setFormData({
          userName: "",
          mobileNumber: "",
          userComments: "",
          courseName: "",
          duration: "",
        });
        setLoading(false);
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dff9fb] to-[#95afc0] px-4 py-12"
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <Link to="/" className="flex flex-col items-center justify-center p-4">
          <img className="w-20" src={Logo} alt="TCI" />
        </Link>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
          আপনার যে কোন প্রশ্নের উত্তর পেতে
        </h2>
        <p className="mt-3 text-center text-gray-600">
          ফর্মটি পূরণ করুন, আমাদের টিম কল করবে।
        </p>

        <form className="mt-8 grid grid-cols-1 gap-5" onSubmit={handleSubmit}>
          <Input
            placeholder="আপনার নাম"
            required
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            className="rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-500"
          />

          <Input
            type="tel"
            placeholder="মোবাইল নম্বর"
            required
            value={formData.mobileNumber}
            onChange={(e) =>
              setFormData({ ...formData, mobileNumber: e.target.value })
            }
            className="rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-500"
          />

          {/* কোর্স ড্রপডাউন */}
          <select
            required
            value={formData.courseName}
            onChange={(e) =>
              setFormData({ ...formData, courseName: e.target.value })
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
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
            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
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
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          ></textarea>

          {formMsg && (
            <span className="text-green-600 text-center font-medium">
              {formMsg}
            </span>
          )}

          <Button
            type="submit"
            className="rounded-xl bg-gradient-to-br from-[#78e08f] to-[#95afc0] hover:bg-yellow-600 text-white py-2 font-semibold transition-all duration-300"
          >
            {loading ? "সাবমিট হচ্ছে..." : "সাবমিট"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
