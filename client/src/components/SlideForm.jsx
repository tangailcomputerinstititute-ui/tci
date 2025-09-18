import { useState } from "react";

export default function SlideForm({ onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    tag: "",
    caption: "",
    slideImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "slideImage") {
      setFormData({ ...formData, slideImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("tag", formData.tag);
    data.append("caption", formData.caption);
    data.append("slideImage", formData.slideImage);

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/slides`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to add slide");

      setMessage("✅ Slide added successfully!");
      setFormData({ tag: "", caption: "", slideImage: null });

      // call parent callbacks
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Add New Slide</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tag */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Tag</label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Caption */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Caption
          </label>
          <input
            type="text"
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Slide Image
          </label>
          <input
            type="file"
            name="slideImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Add Slide"}
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="mt-4 text-center font-medium text-sm text-gray-700">
          {message}
        </p>
      )}
    </div>
  );
}
