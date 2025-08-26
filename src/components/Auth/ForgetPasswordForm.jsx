import React from "react";

const ForgotPasswordForm = ({ email, setEmail, handleSubmit, isLoading, onBack }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-6 font-outfit"
    >
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-color)" }}>
          Enter your email to reset password
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-3 py-3 rounded-lg transition-colors focus:outline-none"
          style={{
            borderColor: "var(--primary-color)",
            backgroundColor: "var(--sho-bg-color)",
            color: "var(--text-color)",
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200"
        style={{
          backgroundColor: "var(--primary-color)",
          color: "var(--text-color)",
        }}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "Send Reset Link"
        )}
      </button>

      <div className="text-center mt-4">
        <button
          type="button"
          className="text-sm underline hover:opacity-80 transition-opacity"
          style={{ color: "var(--primary-color)" }}
          onClick={onBack}
        >
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
