import React from "react";
import { Truck, Home, Phone, Mail } from "lucide-react";

const AddressSection = ({ icon: Icon, title, data }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-gray-100">
        <Icon className="w-5 h-5 text-gray-700" />
      </div>
      <div>
        <div className="text-sm font-medium text-gray-900">{data.name}</div>
        <div className="text-sm text-gray-500">{data.address}</div>
        <div className="text-xs text-gray-400 mt-1">
          {data.city}, {data.state} {data.zip}
        </div>
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <div className="p-2 rounded-lg bg-gray-100">
          <Phone className="w-5 h-5 text-gray-700" />
        </div>
        <div>{data.phone}</div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <div className="p-2 rounded-lg bg-gray-100">
          <Mail className="w-5 h-5 text-gray-700" />
        </div>
        <div className="break-all">{data.email}</div>
      </div>
    </div>
  </div>
);

const OrderAddressesCard = ({ order }) => {
  return (
    <>
      <AddressSection
        title="Shipping Address"
        data={order.shipping}
        icon={Truck}
      />
      <AddressSection
        title="Billing Address"
        data={order.billing}
        icon={Home}
      />
    </>
  );
};

export default OrderAddressesCard;
