import React, { useState, useEffect } from "react";
import axios from "axios";

function Siteinfo() {
  const [siteInfo, setSiteInfo] = useState({
    siteName: "",
    address: "",
    mobile: "",
    siteVideoUrl: "",
    siteDescription: "",
    siteDescriptionTitel: "",
  });
  const [editField, setEditField] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  // ডেটা লোড করা
  useEffect(() => {
    axios.get(`${baseUrl}/siteinfo`).then((res) => {
      setSiteInfo(res.data);
    });
  }, []);

  // Save function
  const handleSave = async (field) => {
    try {
      const res = await axios.put(`${baseUrl}/siteinfo`, siteInfo);
      setSiteInfo(res.data);
      setEditField(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="p-6  mx-auto bg-white shadow-lg space-y-4 mt-4 border-2 border-purple-500 rounded-xl">
      {/* Site Name */}
      <div className="flex items-center gap-2">
        <label className="w-32 font-medium">Site Name:</label>
        {editField === "siteName" ? (
          <>
            <input
              className="border rounded px-2 py-1 flex-1"
              value={siteInfo.siteName}
              onChange={(e) =>
                setSiteInfo({ ...siteInfo, siteName: e.target.value })
              }
            />
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => handleSave("siteName")}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <span className="flex-1">{siteInfo.siteName}</span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => setEditField("siteName")}
            >
              Edit
            </button>
          </>
        )}
      </div>

      {/* Address */}
      <div className="flex items-center gap-2">
        <label className="w-32 font-medium">Address:</label>
        {editField === "address" ? (
          <>
            <input
              className="border rounded px-2 py-1 flex-1"
              value={siteInfo.address}
              onChange={(e) =>
                setSiteInfo({ ...siteInfo, address: e.target.value })
              }
            />
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => handleSave("address")}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <span className="flex-1">{siteInfo.address}</span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => setEditField("address")}
            >
              Edit
            </button>
          </>
        )}
      </div>

      {/* Mobile */}
      <div className="flex items-center gap-2">
        <label className="w-32 font-medium">Mobile:</label>
        {editField === "mobile" ? (
          <>
            <input
              className="border rounded px-2 py-1 flex-1"
              value={siteInfo.mobile}
              onChange={(e) =>
                setSiteInfo({ ...siteInfo, mobile: e.target.value })
              }
            />
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => handleSave("mobile")}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <span className="flex-1">{siteInfo.mobile}</span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => setEditField("mobile")}
            >
              Edit
            </button>
          </>
        )}
      </div>
      {/* VideoUrl */}
      <div className="flex items-center gap-2">
        <label className="w-32 font-medium">Site Video Url:</label>
        {editField === "siteVideoUrl" ? (
          <>
            <input
              className="border rounded px-2 py-1 flex-1"
              value={siteInfo.siteVideoUrl}
              onChange={(e) =>
                setSiteInfo({ ...siteInfo, siteVideoUrl: e.target.value })
              }
            />
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => handleSave("siteVideoUrl")}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <span className="flex-1">{siteInfo.siteVideoUrl}</span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => setEditField("siteVideoUrl")}
            >
              Edit
            </button>
          </>
        )}
      </div>

      {/* Site Description Titel */}
      <div className="flex items-center gap-2">
        <label className="w-32 font-medium">Description Titel:</label>
        {editField === "siteDescriptionTitel" ? (
          <>
            <input
              className="border rounded px-2 py-1 flex-1"
              value={siteInfo.siteDescriptionTitel}
              onChange={(e) =>
                setSiteInfo({
                  ...siteInfo,
                  siteDescriptionTitel: e.target.value,
                })
              }
            />
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => handleSave("siteDescriptionTitel")}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <span className="flex-1">{siteInfo.siteDescriptionTitel}</span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => setEditField("siteDescriptionTitel")}
            >
              Edit
            </button>
          </>
        )}
      </div>
      {/* Site Descriptions */}
      <div className="flex items-center gap-2">
        <label className="w-32 font-medium">Site Descriptions:</label>
        {editField === "siteDescription" ? (
          <>
            <textarea
              className="border rounded px-2 py-1 flex-1"
              value={siteInfo.siteDescription}
              onChange={(e) =>
                setSiteInfo({ ...siteInfo, siteDescription: e.target.value })
              }
            />
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => handleSave("siteDescription")}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <span className="flex-1">{siteInfo.siteDescription}</span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => setEditField("siteDescription")}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Siteinfo;
