import CustomBtn from "@/app/components/CustomBtn";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PlanStartDate() {
  const [startDate, setStartDate] = useState(null); // ✅ Use null instead of empty string

  const handleConfirm = () => {
    if (startDate instanceof Date) {
      alert(`Plan starts on: ${startDate.toDateString()}`);
      // Submit the date to API if needed
    } else {
      alert("Please select a valid date.");
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-3">
        Choose your plan start date
      </h3>
      <div className="flex items-center space-x-4">
        <div className="relative w-full">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select a date"
            dateFormat="yyyy-MM-dd"
            className="w-full border border-teal-300 rounded-md px-4 py-2"
          />
        </div>
        <CustomBtn className="px-3 py-2" onClick={handleConfirm}>
          Confirm
        </CustomBtn>
      </div>
    </div>
  );
}

export default PlanStartDate;
