import { useState, useEffect } from "react";
import SlideForm from "./SlideForm"; // তোমার আলাদা করা ফর্ম

export default function Slides() {
  const [slides, setSlides] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Fetch all slides
  const fetchSlides = async () => {
    try {
      const res = await fetch(`${baseUrl}/slides`);
      const data = await res.json();
      setSlides(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // Delete Slide
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;

    try {
      const res = await fetch(`${baseUrl}/slides/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete slide");
      setSlides(slides.filter((s) => s._id !== id));
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className=" mx-auto p-6">
      {/* Add Slide Button */}
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">All Slides</h2>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Slide
        </button>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <SlideForm
              onSuccess={fetchSlides}
              onClose={() => setOpenModal(false)}
            />
          </div>
        </div>
      )}

      {/* Slide List */}

      <div className="grid md:grid-cols-2 gap-6">
        {slides.map((slide) => (
          <div
            key={slide._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden"
          >
            <img
              src={slide.slideImageUrl}
              alt={slide.caption}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{slide.tag}</h3>
              <p className="text-gray-600">{slide.caption}</p>
              <button
                onClick={() => handleDelete(slide._id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
