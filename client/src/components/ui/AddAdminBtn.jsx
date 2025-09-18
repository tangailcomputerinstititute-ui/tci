import React from "react";

function AddAdminBtn({ setShowAddForm, adminTypeLocals }) {
  return (
    <div className="mb-6">
      <button
        onClick={() => setShowAddForm(true)}
        className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition cursor-pointer ${
          adminTypeLocals !== "Main" ? "hidden" : "block"
        }`}
      >
        Add Admin
      </button>
    </div>
  );
}

export default AddAdminBtn;
