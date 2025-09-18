import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Phone, MapPin, Mail } from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import axios from "axios";

function AddressCard() {
  const [siteInfo, setSiteInfo] = useState({
    siteName: "",
    address: "",
    mobile: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    github: "",
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get(`${baseUrl}/siteinfo`).then((res) => {
      setSiteInfo(res.data);
    });
  }, []);

  return (
    <div className="space-y-4">
      {/* Address */}
      <Card className="rounded-3xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5" /> {siteInfo.mobile}
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5" /> {siteInfo.address}
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5" /> {siteInfo.siteName}
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card className="rounded-3xl">
        <CardContent className="p-6 flex items-center justify-center gap-6">
          {
            <a
              href="facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
          }
          {
            <a
              href={siteInfo.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500"
            >
              <FaTwitter className="h-6 w-6" />
            </a>
          }
          {
            <a
              href={siteInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
          }
          {
            <a
              href={siteInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
          }
          {
            <a
              href={siteInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800"
            >
              <FaGithub className="h-6 w-6" />
            </a>
          }
        </CardContent>
      </Card>
    </div>
  );
}

export default AddressCard;
