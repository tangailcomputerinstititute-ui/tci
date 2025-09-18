import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AddAdmin from "./AddAdmin";
import AdminList from "./AdminList";
import AddAdminBtn from "./ui/AddAdminBtn";
import Siteinfo from "./Siteinfo";

export default function Settings() {
  const [admins, setAdmins] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    adminName: "",
    adminPassword: "",
  });
  const [addFormData, setAddFormData] = useState({
    adminName: "",
    adminPassword: "",
    adminType: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showAddPassword, setShowAddPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const adminTypeLocals = localStorage.getItem("adminType");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const res = await fetch(`${baseUrl}/admin`);
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------- Validation -----------------
  const validate = (data, isAdd = false) => {
    const newErrors = {};
    if (!data.adminName.trim()) newErrors.adminName = "Admin name is required.";
    if (!data.adminPassword.trim())
      newErrors.adminPassword = "Password is required.";
    else if (data.adminPassword.length < 6)
      newErrors.adminPassword = "Password must be at least 6 characters.";
    if (isAdd && !data.adminType.trim())
      newErrors.adminType = "Admin type is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ----------------- Edit Admin -----------------
  const handleEdit = (admin) => {
    setEditingId(admin._id);
    setFormData({
      adminName: admin.adminName,
      adminPassword: admin.adminPassword,
    });
    setErrors({});
    setShowPassword(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!validate(formData)) return;

    try {
      const res = await fetch(`${baseUrl}/admin/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updated = await res.json();
        setAdmins((prev) =>
          prev.map((admin) => (admin._id === editingId ? updated : admin))
        );
        setEditingId(null);
        setSuccessMessage("Admin updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ adminName: "", adminPassword: "" });
    setErrors({});
    setShowPassword(false);
  };

  // ----------------- Delete Admin -----------------
  const handleDelete = async (admin) => {
    if (admin.adminType === "Main") {
      alert("Main admin cannot be deleted!");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${admin.adminName}?`))
      return;

    try {
      const res = await fetch(`${baseUrl}/admin/${admin._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setAdmins((prev) => prev.filter((a) => a._id !== admin._id));
        setSuccessMessage("Admin deleted successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------- Add Admin -----------------
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAdmin = async () => {
    if (!validate(addFormData, true)) return;

    try {
      const res = await fetch(`${baseUrl}/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addFormData),
      });
      if (res.ok) {
        setSuccessMessage("Admin added successfully!");
        setAddFormData({ adminName: "", adminPassword: "", adminType: "" });
        setShowAddForm(false);
        fetchAdmin();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Settings</h1>

      <AddAdminBtn
        setShowAddForm={setShowAddForm}
        adminTypeLocals={adminTypeLocals}
      />
      {/* ----------------- Admin List ----------------- */}
      <AdminList
        admins={admins}
        editingId={editingId}
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        Eye={Eye}
        EyeOff={EyeOff}
      />
      <Siteinfo />
      {/* ----------------- Add Admin Modal ----------------- */}
      {showAddForm && (
        <AddAdmin
          addFormData={addFormData}
          handleAddChange={handleAddChange}
          showAddPassword={showAddPassword}
          setShowAddPassword={setShowAddPassword}
          setShowAddForm={setShowAddForm}
          errors={errors}
          Eye={Eye}
          EyeOff={EyeOff}
          handleAddAdmin={handleAddAdmin}
        />
      )}
    </div>
  );
}
