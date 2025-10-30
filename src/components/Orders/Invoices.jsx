import React from "react";
import { FileText, Eye } from "lucide-react";

const Invoices = ({ onView, onDownload }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
      <h2 className="text-sm font-semibold text-gray-900">Invoices</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* View Invoice Button */}
        <button
          onClick={onView}
          className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition w-full justify-center"
          title="View Invoice"
        >
          <div className="p-2 rounded-md bg-gray-100">
            <Eye className="w-4 h-4 text-gray-600" />
          </div>
          <span className="text-sm font-medium">View</span>
        </button>

        {/* Download Invoice Button */}
        <button
          onClick={onDownload}
          className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition w-full justify-center"
          title="Download Invoice"
        >
          <div className="p-2 rounded-md bg-gray-100">
            <FileText className="w-4 h-4 text-gray-600" />
          </div>
          <span className="text-sm font-medium">Download</span>
        </button>
      </div>
    </div>
  );
};

export default Invoices;
