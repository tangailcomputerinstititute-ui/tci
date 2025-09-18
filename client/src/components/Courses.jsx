import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Clock, CheckCircle2 } from "lucide-react";

import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]); // backend থেকে আসবে

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
      id="courses"
      className="max-w-7xl mx-auto py-10 bg-gradient-to-bl from-[#b9c9eb] to-[#e5e7eb] rounded-2xl mt-6 shadow-sm"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              জনপ্রিয় কোর্স
            </h2>
            <p className="text-slate-600 mt-2">
              স্কিল আপগ্রেড করতে বেছে নিন আপনার কোর্স।
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-2xl px-6 py-2 border-gray-400 hover:bg-gray-100 transition"
          >
            সব কোর্স
          </Button>
        </div>

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((c) => (
            <Card
              key={c._id}
              className="group rounded-2xl hover:shadow-xl transition bg-white"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {c.courseName}
                </CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {c.tags?.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg"
                    >
                      {t.tagName}
                    </span>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Duration */}
                <div className="flex items-center justify-between text-sm text-gray-700">
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    {c.courseDuration}
                  </span>
                </div>

                {/* Course Topics */}
                <ul className="space-y-2 text-sm text-gray-700">
                  {c.courseTitel?.map((t, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      {t.titelName}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  to="/student"
                  state={{
                    courseName: c.courseName,
                    courseDuration: c.courseDuration,
                  }}
                  className="block text-center bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition"
                >
                  অ্যাডমিশন নিন
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Courses;
