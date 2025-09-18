import React from "react";

function AdminList({
  admins,
  editingId,
  formData,
  handleChange,
  errors,
  showPassword,
  setShowPassword,
  handleSave,
  handleCancel,
  handleEdit,
  handleDelete,
  Eye,
  EyeOff,
}) {
  const adminTypeLocals = localStorage.getItem("adminType");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {admins.map((admin, i) => (
        <div
          key={admin._id}
          className={`bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 `}
        >
          {editingId === admin._id ? (
            <div className="flex flex-col gap-4">
              <input
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                placeholder="Admin Name"
                className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.adminName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.adminName && (
                <p className="text-red-500 text-sm">{errors.adminName}</p>
              )}

              <div className="relative">
                <input
                  name="adminPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.adminPassword}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.adminPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.adminPassword && (
                  <p className="text-red-500 text-sm">{errors.adminPassword}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              className={`p-6 rounded-lg shadow-xl ${
                i % 2 ? "border-2 border-rose-500" : "border-2 border-green-500"
              }`}
            >
              <p className="font-semibold text-gray-700 mb-1">
                Name: <span className="font-normal">{admin.adminName}</span>
              </p>
              {adminTypeLocals !== "Main" ? (
                ""
              ) : (
                <p className="font-semibold text-gray-700 mb-1">
                  Password:{" "}
                  <span className="font-normal">{admin.adminPassword}</span>
                </p>
              )}

              <p className="font-semibold text-gray-700 mb-3">
                Type: <span className="font-normal">{admin.adminType}</span>
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(admin)}
                  className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition ${
                    adminTypeLocals !== "Main" ? "hidden" : "block"
                  }`}
                >
                  Edit
                </button>

                {admin.adminType !== "Main" && (
                  <button
                    onClick={() => handleDelete(admin)}
                    className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition ${
                      adminTypeLocals !== "Main" ? "hidden" : "block"
                    }`}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminList;
