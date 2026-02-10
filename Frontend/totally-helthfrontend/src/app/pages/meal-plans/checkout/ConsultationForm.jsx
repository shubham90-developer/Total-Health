import CustomBtn from "@/app/components/CustomBtn";
import { useState } from "react";

function ConsultationForm() {
  const [consultType, setConsultType] = useState("");
  const [language, setLanguage] = useState("English");
  const [location, setLocation] = useState("Totally HealthyHQ");
  const [dateTime, setDateTime] = useState("");

  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-5">
        Arrange your consultation with a nutritionist (optional)
      </h3>

      {/* Consultation Type */}
      <div className="flex justify-between mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="consultType"
            value="In Person"
            checked={consultType === "In Person"}
            onChange={() => setConsultType("In Person")}
          />
          <div>
            <p className="font-bold text-xs">In Person</p>
            <p className="text-xs text-gray-400">
              * additional charge of AED 150
            </p>
          </div>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="consultType"
            value="Call"
            checked={consultType === "Call"}
            onChange={() => setConsultType("Call")}
          />
          <div>
            <p className="font-bold  text-xs">Call</p>
            <p className="text-xs text-gray-400">Free</p>
          </div>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="consultType"
            value="Zoom"
            checked={consultType === "Zoom"}
            onChange={() => setConsultType("Zoom")}
          />
          <div>
            <p className="font-bold  text-xs">Zoom</p>
            <p className="text-xs text-gray-400">Free</p>
          </div>
        </label>
      </div>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-gray-200 rounded-md px-3 py-2 text-xs"
        >
          <option>English</option>
          <option>Arabic</option>
          <option>Hindi</option>
        </select>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-200 rounded-md px-3 py-2 text-xs"
        >
          <option>Totally HealthyHQ</option>
          <option>Branch A</option>
          <option>Branch B</option>
        </select>
        <input
          type="datetime-local"
          className="border border-gray-200 rounded-md px-3 py-2 text-xs"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button className="text-gray-500 hover:underline cursor-pointer">
          Skip
        </button>
        <CustomBtn className="px-3 py-2">Confirm</CustomBtn>
      </div>
    </div>
  );
}

export default ConsultationForm;
