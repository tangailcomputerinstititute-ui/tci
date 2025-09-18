import React, { useState } from "react";

export default function TeacherForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    teacherName: "",
    selectedCourse: "",
    descriptions: "",
    teacherImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "teacherImage") {
      setFormData({ ...formData, teacherImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("teacherName", formData.teacherName);
      formDataToSend.append("selectedCourse", formData.selectedCourse);
      formDataToSend.append("descriptions", formData.descriptions);
      formDataToSend.append("teacherImage", formData.teacherImage);

      const res = await fetch(`${baseUrl}/teacher`, {
        method: "POST",
        body: formDataToSend,
      });

      if (res.ok) {
        onSuccess?.();
      } else {
        setError("Failed to save teacher. Please try again.");
      }
    } catch (error) {
      console.error("Error saving teacher:", error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Teacher</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Teacher Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Teacher Name
          </label>
          <input
            type="text"
            name="teacherName"
            value={formData.teacherName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Enter teacher name"
            required
          />
        </div>

        {/* Selected Course */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Selected Course
          </label>
          <input
            type="text"
            name="selectedCourse"
            value={formData.selectedCourse}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Descriptions */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="descriptions"
            value={formData.descriptions}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Write something about the teacher"
            required
          ></textarea>
        </div>

        {/* Teacher Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Upload Teacher Image
          </label>
          <input
            type="file"
            name="teacherImage"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
            accept="image/*"
            required
          />
          {formData.teacherImage && (
            <img
              src={URL.createObjectURL(formData.teacherImage)}
              alt="Preview"
              className="h-24 w-24 object-cover rounded-lg mt-2 border"
            />
          )}
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Teacher"}
        </button>
      </form>
    </div>
  );
}
