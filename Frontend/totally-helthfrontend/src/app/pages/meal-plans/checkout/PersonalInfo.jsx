import { useState } from "react";

function PersonalInfo() {
  const [authMode, setAuthMode] = useState("register");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-md shadow">
      {/* Toggle Auth Buttons */}
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 rounded-l-md font-medium transition ${
            authMode === "register"
              ? "bg-[#61844c] text-white"
              : "bg-[#e0e0e0] text-gray-600"
          }`}
          onClick={() => setAuthMode("register")}
        >
          Register
        </button>
        <button
          className={`flex-1 py-2 rounded-r-md font-medium transition ${
            authMode === "signin"
              ? "bg-[#61844c] text-white"
              : "bg-[#e0e0e0] text-gray-600"
          }`}
          onClick={() => setAuthMode("signin")}
        >
          Sign In
        </button>
      </div>

      {/* Form or Personal Info */}
      {authMode === "register" && !isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="+971 | Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="py-2 px-4 bg-[#61844c] text-white rounded-md"
            >
              Register
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-[#f0fdf4] p-4 rounded-md shadow relative">
          <div className="absolute top-2 right-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              ✎ Edit
            </button>
          </div>
          <h3 className="text-lg font-semibold mb-2">Personal information</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-100 px-3 py-1 rounded">
              <strong>Full Name:</strong> {formData.fullName}
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded">
              <strong>Email:</strong> {formData.email}
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded">
              <strong>Phone Number:</strong> {formData.phone}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalInfo;
