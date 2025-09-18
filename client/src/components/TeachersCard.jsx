// TeachersCard.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * Card animation variants
 */
const cardVariants = (isEven) => ({
  hidden: { opacity: 0, x: isEven ? -60 : 60, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
});

/**
 * Small fallback SVG placeholder (data URI) to avoid broken images.
 */
const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><rect width='100%' height='100%' fill='#e2e8f0'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#94a3b8' font-family='Arial' font-size='18'>No Image</text></svg>`
  );

/**
 * Normalize teacher object to expected keys used in the UI.
 * Accepts many possible key names that your API might return.
 */
function normalizeTeacher(raw = {}) {
  return {
    teacherName:
      raw.teacherName ||
      raw.name ||
      raw.fullName ||
      raw.teacher_name ||
      "নাম নেই",
    selectedCourse:
      raw.selectedCourse ||
      raw.subject ||
      raw.course ||
      raw.selected_course ||
      "-",
    teacherImageUrl:
      raw.teacherImageUrl ||
      raw.img ||
      raw.image ||
      raw.photo ||
      raw.teacher_image_url ||
      PLACEHOLDER_IMG,
    descriptions:
      raw.descriptions || raw.bio || raw.description || raw.about || "",
    // keep original raw if ever needed
    raw,
  };
}

/**
 * Subcomponent for each teacher row (keeps hooks valid)
 */
function TeacherRow({ teacher, index }) {
  const isEven = index % 2 === 0;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      key={index}
      variants={cardVariants(isEven)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`flex items-center bg-white shadow-lg p-6 transition-all duration-500 hover:shadow-xl w-full md:w-2/3
        ${
          isEven
            ? "rounded-none md:rounded-r-full justify-end mr-auto"
            : "rounded-none md:rounded-l-full ml-auto"
        }
      `}
    >
      <div
        className={`flex items-center ${
          isEven ? "flex-row-reverse justify-end" : "flex-row"
        }`}
      >
        <img
          src={teacher.teacherImageUrl}
          alt={teacher.teacherName}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = PLACEHOLDER_IMG;
          }}
          className="w-28 h-28 rounded-full object-cover"
        />
        <div className={`${isEven ? "text-right" : "text-left"} mx-4`}>
          <h3 className="text-xl font-semibold text-gray-700">
            {teacher.teacherName}
          </h3>
          <p className="text-indigo-500 font-medium">
            {teacher.selectedCourse}
          </p>
          <p className="text-gray-600 text-sm">{teacher.descriptions}</p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Main TeachersCard component
 */
export default function TeachersCard() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_BASE_URL || ""; // ensure string

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchTeachers() {
      setLoading(true);
      setError(null);

      // If baseUrl not configured, optionally use local fallback data
      if (!baseUrl) {
        // fallback static data (normalize too)
        const fallback = [
          {
            teacherName: "মোঃ ওবায়েদুল কাদের",
            selectedCourse: "Microsoft Office",
            teacherImageUrl: PLACEHOLDER_IMG,
            descriptions:
              "Experienced in algebra, calculus, and geometry with 10+ years of teaching.",
          },
          {
            teacherName: "আল আমিন",
            selectedCourse: "SEO , Web & Apps Development",
            teacherImageUrl: PLACEHOLDER_IMG,
            descriptions:
              "Passionate about explaining physics concepts in a fun and practical way.",
          },
          {
            teacherName: "শারমিন সুলতানা",
            selectedCourse: "Digital Marketing",
            teacherImageUrl: PLACEHOLDER_IMG,
            descriptions:
              "Helps students improve communication, grammar, and creative writing.",
          },
        ].map(normalizeTeacher);

        setTeachers(fallback);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${baseUrl.replace(/\/$/, "")}/teacher`, {
          signal,
        });

        if (!res.ok) {
          const msg = `Fetch error: ${res.status} ${res.statusText}`;
          console.error(msg);
          setError(msg);
          setTeachers([]);
          setLoading(false);
          return;
        }

        const data = await res.json();

        // If API returns an object with a `data` field, try to find array
        let items = [];
        if (Array.isArray(data)) items = data;
        else if (Array.isArray(data.data)) items = data.data;
        else if (Array.isArray(data.teachers)) items = data.teachers;
        else if (data && typeof data === "object") {
          // maybe the API returned a single object -> wrap
          items = [data];
        } else items = [];

        const normalized = items.map(normalizeTeacher);
        setTeachers(normalized);
        setLoading(false);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Error fetching teachers:", err);
        setError(err.message || "Unknown error");
        setTeachers([]);
        setLoading(false);
      }
    }

    fetchTeachers();

    return () => {
      controller.abort();
    };
  }, [baseUrl]);

  return (
    <section className="py-2">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Meet Our Teachers
        </h2>

        <div className="flex flex-col space-y-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-500 mb-2">Error: {error}</p>
              <p className="text-sm text-gray-600">
                Please check your API or try again later.
              </p>
            </div>
          ) : teachers.length === 0 ? (
            <p className="text-center text-red-500">No teachers found.</p>
          ) : (
            teachers.map((t, i) => (
              <TeacherRow key={`${t.teacherName}-${i}`} teacher={t} index={i} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
