import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // lucide-react থেকে ব্যাক আইকন

export default function StudentForm() {
  const location = useLocation();
  const { courseName, courseDuration } = location.state || {}; // null check

  const [formData, setFormData] = useState({
    studentName: "",
    studentMobile: "",
    courseName: "",
    courseDuration: "",
    address: "",
    admissionDate: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (courseName || courseDuration) {
      setFormData((prev) => ({
        ...prev,
        courseName: courseName || "",
        courseDuration: courseDuration || "",
      }));
    }
  }, [courseName, courseDuration]);

  const [file, setFile] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return alert("Please select an image!");
    }

    const data = new FormData();
    data.append("studentName", formData.studentName);
    data.append("studentMobile", formData.studentMobile);
    data.append("courseName", formData.courseName);
    data.append("courseDuration", formData.courseDuration);
    data.append("address", formData.address);
    data.append("admissionDate", formData.admissionDate);
    data.append("file", file);

    try {
      const res = await fetch(`${baseUrl}/student`, {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert("Form Submited successfully!");
        setFormData({
          studentName: "",
          studentMobile: "",
          courseName: "",
          courseDuration: "",
          address: "",
          admissionDate: "",
        });
        setFile(null);
        navigate("/");
      } else {
        alert("Failed to add student!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg relative"
      >
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Student Admission Form
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Student Name</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            placeholder="Enter student name"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Upload Image</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2 rounded-lg"
            accept="image/*"
            required
          />
        </div>

        {/* Mobile */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Mobile</label>
          <input
            type="text"
            name="studentMobile"
            value={formData.studentMobile}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            placeholder="Enter mobile number"
            required
          />
        </div>

        {/* Course */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Course Name</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            placeholder="Enter course name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Course Duration</label>
          <input
            type="text"
            name="courseDuration"
            value={formData.courseDuration}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            placeholder="e.g. 6 months"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            placeholder="Enter address"
            required
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Admission Date</label>
          <input
            type="date"
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
