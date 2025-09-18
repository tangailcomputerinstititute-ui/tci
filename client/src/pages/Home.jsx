import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Button } from "../components/ui/button";

import { Card, CardContent } from "../components/ui/card";

import { GraduationCap, Clock, Users, Star, ArrowRight } from "lucide-react";

import Slider from "@/components/Slider";

import TeachersCard from "@/components/TeachersCard";
import axios from "axios";
import Courses from "@/components/Courses";
import Navbar from "@/components/Navbar";
import Question from "@/components/Question";
import InstituteDetails from "@/components/InstituteDetails";

const baseUrl = import.meta.env.VITE_BASE_URL;

// stats data
const stats = [
  { label: "স্টুডেন্ট", value: "২,৫০০+" },
  { label: "লাইভ ব্যাচ", value: "১২" },
  { label: "প্লেসমেন্ট", value: "৮৫%" },
  { label: "ইন্সট্রাক্টর", value: "১৫+" },
];

export default function Home() {
  const [siteDescriptionTitel, setSiteDescriptionTitel] = useState([]);
  const [siteDescription, setSiteDescription] = useState([]);
  const [siteVideoUrl, setSiteVideoUrl] = useState([]);
  const [formMsg, setFormMsg] = useState("");
  const [slides, setSlides] = useState("");
  const [siteName, setSiteName] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    mobileNumber: "",
    userComments: "",
    courseName: "",
    duration: "",
  });

  useEffect(() => {
    axios.get(`${baseUrl}/siteinfo`).then((res) => {
      if (Array.isArray(res.data) && res.data.length > 0) {
        setSiteName(res.data[0].siteName);
      } else if (res.data.siteName) {
        setSiteName(res.data.siteName);
        setSiteVideoUrl(res.data.siteVideoUrl);
        setSiteDescription(res.data.siteDescription);
        setSiteDescriptionTitel(res.data.siteDescriptionTitel);
      }
    });
  }, []);

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
  // ================Site Info==================

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
        setTimeout(() => {
          setFormMsg("");
        }, 2000);
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <Navbar siteName={siteName} Button={Button} />
      </header>

      <section className="mx-auto mt-2 max-w-7xl grid grid-cols-1 md:grid-cols-8 gap-6 items-center px-4 md:px-6 lg:px-8 py-10 bg-gradient-to-bl from-[#ffffff] to-[#aac9ec] shadow-2xl rounded-xl">
        {/* Left Content */}
        <div className="flex flex-col col-span-3 space-y-6 text-center md:text-left">
          <h2 className="text-lg sm:text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
            {siteName}
          </h2>

          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
            আপনার ক্যারিয়ার শুরু হোক{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
              টিসিআই এর সাথে
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-slate-600 max-w-xl mx-auto md:mx-0">
            প্রজেক্ট-ভিত্তিক কোর্স, ইন্ডাস্ট্রি এক্সপার্ট মেন্টর আর জব-রেডি
            কারিকুলাম—সবকিছু এক জায়গায়।
          </p>

          <div className="mt-2 md:mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
            <Button
              asChild
              size="lg"
              className="rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <a href="#courses" className="flex items-center">
                কোর্স দেখুন <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="rounded-2xl border-2 hover:bg-slate-50 transition"
            >
              <a href="#contact">ফ্রি কাউন্সেলিং</a>
            </Button>
          </div>
        </div>

        {/* Right Content (Slider) */}
        <div className="col-span-5">
          <div className="w-full aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
            <Slider
              slides={slides}
              autoPlay
              interval={3500}
              loop
              showArrows
              showDots
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-blue-500 to-sky-300 max-w-7xl mx-auto rounded-xl mt-4 shadow-md p-4">
        <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-to-tr from-indigo-100 via-white to-pink-100" />
        </div>
        <div className="mx-auto max-w-7xl px-2 py-2">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Stats */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s) => (
                  <Card key={s.label} className="rounded-2xl">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">{s.value}</div>
                      <div className="text-xs text-slate-500">{s.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
                <Card className="rounded-3xl shadow-xl">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          icon: GraduationCap,
                          title: "সার্টিফিকেট",
                          text: "প্রতিটি কোর্স শেষে ভেরিফাইড সার্টিফিকেট।",
                        },
                        {
                          icon: Users,
                          title: "মেন্টর সাপোর্ট",
                          text: "লাইভ ক্লাস + কমিউনিটি সহায়তা।",
                        },
                        {
                          icon: Clock,
                          title: "ফ্লেক্সিবল টাইম",
                          text: "সকাল, বিকাল ও রাতের ব্যাচ।",
                        },
                        {
                          icon: Star,
                          title: "পোর্টফোলিও",
                          text: "৩+ রিয়েল প্রজেক্ট যুক্ত।",
                        },
                      ].map((f) => (
                        <div key={f.title} className="p-4 border rounded-2xl">
                          <f.icon className="h-6 w-6" />
                          <div className="mt-2 font-semibold">{f.title}</div>
                          <p className="text-sm text-slate-600">{f.text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Institute Details*/}
      <section
        id="teachers"
        className="max-w-7xl mx-auto py-4 mt-4 rounded-xl shadow-lg bg-gradient-to-br from-[#A3CB38] to-[#f7d794]"
      >
        <InstituteDetails
          siteDescription={siteDescription}
          siteVideoUrl={siteVideoUrl}
          siteDescriptionTitel={siteDescriptionTitel}
        />
      </section>

      {/* Courses Section */}
      <Courses />

      {/* Contact Form Section */}
      <Question
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        formMsg={formMsg}
        Button={Button}
        loading={loading}
      />

      {/* Teachers Section */}
      <section
        id="teachers"
        className="max-w-7xl mx-auto py-4 mt-4 rounded-xl shadow-lg bg-gradient-to-br from-[#82ccdd] to-[#60a3bc]"
      >
        <TeachersCard />
      </section>

      {/* Footer */}
      <footer className="border-t bg-blue-950 mt-4  text-white rounded-none md:rounded-t-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-sm  flex flex-col md:flex-row items-center justify-between gap-4 ">
          <div>
            © {new Date().getFullYear()} Tangail Computer Institute. সর্বস্বত্ব
            সংরক্ষিত।
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-800">
              টার্মস
            </a>
            <a href="#" className="hover:text-slate-800">
              প্রাইভেসি
            </a>
            <a href="#" className="hover:text-slate-800">
              রিফান্ড পলিসি
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
