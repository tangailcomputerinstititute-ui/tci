import React from "react";
import { Text } from "lucide-react";

const Textarea = () => {
  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor="my-textarea"
        className="flex items-center text-sm font-medium text-gray-700"
      >
        <Text size={20} className="mr-2 text-gray-600" />
        Enter your message:
      </label>
      <textarea
        id="my-textarea"
        rows="5"
        placeholder="Type here..."
        className="w-full rounded-2xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      ></textarea>
    </div>
  );
};

export default Textarea;
