import CustomBtn from "@/app/components/CustomBtn";
import { useState } from "react";

function DeliveryLocationForm() {
  const [locationType, setLocationType] = useState("Home");
  const [formData, setFormData] = useState({
    search: "",
    houseNumber: "",
    address: "",
    building: "",
    instructions: "",
    deliveryTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-3">Delivery Location</h3>

      {/* Location Type Toggle */}
      <div className="flex space-x-3 mb-4">
        {["Home", "Office", "Other"].map((type) => (
          <button
            key={type}
            className={`px-4 py-1 rounded-md border text-xs ${
              locationType === type
                ? "bg-[#61844c] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setLocationType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="text"
        name="search"
        placeholder="Select on map or type your address"
        value={formData.search}
        onChange={handleChange}
        className="w-full mb-3 border px-3 py-2 rounded-md"
      />

      {/* Google Map (static embed for demo) */}
      <div className="mb-4 h-64">
        <iframe
          title="map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed/v1/place?q=Emirates+Hills+Dubai&key=YOUR_API_KEY"
        ></iframe>
      </div>

      {/* Address Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <input
          type="text"
          name="houseNumber"
          placeholder="Door/House Number"
          value={formData.houseNumber}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          name="building"
          placeholder="Building/Community Name"
          value={formData.building}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          name="instructions"
          placeholder="Delivery instructions"
          value={formData.instructions}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
      </div>

      {/* Delivery Time Dropdown */}
      <select
        name="deliveryTime"
        value={formData.deliveryTime}
        onChange={handleChange}
        className="w-full mb-4 border border-gray-200 text-xs px-3 py-3 rounded-md"
      >
        <option>Select your preferred delivery time</option>
        <option>8:00 AM - 10:00 AM</option>
        <option>12:00 PM - 2:00 PM</option>
        <option>4:00 PM - 6:00 PM</option>
      </select>

      {/* Confirm Button */}
      <div className="text-right">
        <CustomBtn className="py-2 px-3">Confirm</CustomBtn>
      </div>
    </div>
  );
}

export default DeliveryLocationForm;
