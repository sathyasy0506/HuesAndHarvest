import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const LoaderCircle = ({
  status = "loading",
  text = "Processing Payment...",
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        {status === "loading" && (
          <>
            <div className="w-16 h-16 border-4 border-blue-600 border-dashed rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700 font-medium">{text}</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-gray-800 font-semibold text-lg">{text}</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <p className="text-gray-800 font-semibold text-lg">{text}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoaderCircle;
