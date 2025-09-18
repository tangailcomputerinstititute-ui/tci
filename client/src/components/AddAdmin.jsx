import React from "react";

function AddAdmin({
  addFormData,
  handleAddChange,
  showAddPassword,
  setShowAddPassword,
  setShowAddForm,
  errors,
  Eye,
  handleAddAdmin,
  EyeOff,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl w-96 relative">
        <h2 className="text-xl font-bold mb-4">Add New Admin</h2>

        <div className="mb-3">
          <input
            name="adminName"
            value={addFormData.adminName}
            onChange={handleAddChange}
            placeholder="Admin Name"
            className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.adminName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.adminName && (
            <p className="text-red-500 text-sm">{errors.adminName}</p>
          )}
        </div>

        <div className="mb-3 relative">
          <input
            name="adminPassword"
            type={showAddPassword ? "text" : "password"}
            value={addFormData.adminPassword}
            onChange={handleAddChange}
            placeholder="Password"
            className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.adminPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowAddPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showAddPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.adminPassword && (
            <p className="text-red-500 text-sm">{errors.adminPassword}</p>
          )}
        </div>

        <div className="mb-4">
          <select
            name="adminType"
            value={addFormData.adminType}
            onChange={handleAddChange}
            className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.adminType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">--Select Type--</option>
            <option value="Moderator">Moderator</option>
          </select>
          {errors.adminType && (
            <p className="text-red-500 text-sm">{errors.adminType}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAddAdmin}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
          >
            Save
          </button>
          <button
            onClick={() => setShowAddForm(false)}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;
