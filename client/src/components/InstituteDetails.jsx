import React from "react";

function getEmbedUrl(url) {
  try {
    const urlObj = new URL(url);
    if (
      urlObj.hostname.includes("youtube.com") ||
      urlObj.hostname.includes("youtu.be")
    ) {
      let videoId = "";
      if (urlObj.hostname === "youtu.be") {
        // short link
        videoId = urlObj.pathname.slice(1);
      } else {
        // normal youtube link
        videoId = urlObj.searchParams.get("v");
      }
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url; // fallback
  } catch {
    return url;
  }
}

function InstituteDetails({
  siteDescription,
  siteVideoUrl,
  siteDescriptionTitel,
}) {
  return (
    <section className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Left side - Video */}
      <div className="w-full">
        <iframe
          className="w-full h-64 md:h-80 rounded-xl shadow-lg"
          src={getEmbedUrl(siteVideoUrl)}
          title="Institute Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Right side - Text */}
      <div className="h-full flex flex-col items-start justify-start space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {siteDescriptionTitel}
        </h2>
        <p className="text-gray-600 leading-relaxed">{siteDescription}</p>
        <p className="text-gray-600 leading-relaxed">
          আমাদের লক্ষ্য হচ্ছে শিক্ষার্থীদের শুধু বইয়ের জ্ঞান নয়, বরং বাস্তব
          জীবনের দক্ষতা অর্জনে সহায়তা করা।
        </p>
      </div>
    </section>
  );
}

export default InstituteDetails;
