import React, { useState, useEffect } from "react";
import Admin from "./Admin";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ adminName: "", password: "" });
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // প্রথম লোডে localStorage থেকে লগইন স্টেট চেক করবে
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/admin/${formData.adminName}`);
      const data = await res.json();
      console.log(data, formData);
      if (data && data.adminPassword === formData.password) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("adminName", data.adminName);
        localStorage.setItem("adminType", data.adminType);
      } else {
        alert("❌ Invalid Admin ID or Password");
      }
    } catch (err) {
      console.error(err);
      alert("Server error! Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({ adminName: "", password: "" });
    localStorage.removeItem("isLoggedIn");
  };

  if (isLoggedIn) {
    return <Admin onLogout={handleLogout} />;
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Admin ID</label>
            <input
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter Admin ID"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
