import React, { useState } from "react";
import axios from "axios";

export default function CourseForm({ onSubmitSuccess }) {
  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseTitel, setCourseTitel] = useState([{ titelName: "" }]);
  const [tags, setTags] = useState([{ tagName: "" }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const baseUrl = import.meta.env.VITE_BASE_URL;
  // টাইটেল পরিবর্তন
  const handleTitelChange = (index, value) => {
    const updated = [...courseTitel];
    updated[index].titelName = value;
    setCourseTitel(updated);
  };

  // টাইটেল যোগ
  const addTitel = () => {
    setCourseTitel([...courseTitel, { titelName: "" }]);
  };

  // ট্যাগ পরিবর্তন
  const handleTagChange = (index, value) => {
    const updated = [...tags];
    updated[index].tagName = value;
    setTags(updated);
  };

  // ট্যাগ যোগ
  const addTag = () => {
    setTags([...tags, { tagName: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = { courseName, courseTitel, courseDuration, tags };

    try {
      const res = await axios.post(`${baseUrl}/course`, formData);
      setMessage("✅ Course saved successfully!");
      console.log("Response:", res.data);

      // ফর্ম রিসেট
      setCourseName("");
      setCourseDuration("");
      setCourseTitel([{ titelName: "" }]);
      setTags([{ tagName: "" }]);

      // সাবমিট সফল হলে মডাল বন্ধ করার কল
      if (onSubmitSuccess) onSubmitSuccess(res.data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Failed to save course!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Course Name
          </label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course name"
            required
          />
        </div>

        {/* Course Duration */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Course Duration
          </label>
          <input
            type="text"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 3 Months"
            required
          />
        </div>

        {/* Course Titles */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Course Titles
          </label>
          {courseTitel.map((titel, index) => (
            <input
              key={index}
              type="text"
              value={titel.titelName}
              onChange={(e) => handleTitelChange(index, e.target.value)}
              className="w-full border rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Title ${index + 1}`}
              required
            />
          ))}
          <button
            type="button"
            onClick={addTitel}
            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            + Add Title
          </button>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Tags</label>
          {tags.map((tag, index) => (
            <input
              key={index}
              type="text"
              value={tag.tagName}
              onChange={(e) => handleTagChange(index, e.target.value)}
              className="w-full border rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Tag ${index + 1}`}
              required
            />
          ))}
          <button
            type="button"
            onClick={addTag}
            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            + Add Tag
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
        >
          {loading ? "Saving..." : "Save Course"}
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="mt-4 text-center font-medium text-gray-700">{message}</p>
      )}
    </div>
  );
}
