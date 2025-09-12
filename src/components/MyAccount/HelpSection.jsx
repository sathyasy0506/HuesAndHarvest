import React from "react";

const HelpSection = () => (
  <div className="space-y-8">
    <div className="card-bg rounded-2xl p-8">
      <h1
        className="text-3xl font-bold primary-text mb-6"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        Help & Support
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Order Issues", desc: "Problems with your orders" },
          { title: "Returns & Refunds", desc: "Return or exchange items" },
          { title: "Account Settings", desc: "Manage your account" },
          { title: "Contact Support", desc: "Get in touch with our team" },
        ].map((item) => (
          <div
            key={item.title}
            className="p-6 rounded-xl cursor-pointer transition-colors hover:opacity-80"
            style={{
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--card-color)",
            }}
          >
            <h3 className="font-semibold primary-text mb-2">{item.title}</h3>
            <p className="muted-text">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HelpSection;
