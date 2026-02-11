import React from "react";
import {
  FaPercent,
  FaBoxOpen,
  FaSmile,
  FaUserFriends,
  FaSadTear,
  FaArrowDown,
  FaBalanceScale,
  FaHandshake,
  FaUserClock,
  FaHandsHelping,
} from "react-icons/fa";

const companies = [
  { icon: <FaPercent />, text: "Discounted prices on all meal plans" },
  { icon: <FaBoxOpen />, text: "Exclusive executive package" },
  { icon: <FaSmile />, text: "Happier, more productive employees" },
  { icon: <FaUserFriends />, text: "Staff loyalty and improved retention" },
  { icon: <FaSadTear />, text: "Fewer sick days and absences" },
  { icon: <FaArrowDown />, text: "Lower healthcare costs" },
];

const employees = [
  { icon: <FaSmile />, text: "Looking and feeling their best" },
  { icon: <FaBalanceScale />, text: "More work/life balance" },
  { icon: <FaHandshake />, text: "Greater camaraderie with co-workers" },
  { icon: <FaArrowDown />, text: "Lower personal healthcare costs" },
  { icon: <FaUserClock />, text: "Ability to be there for family" },
  { icon: <FaHandsHelping />, text: "Feeling cared for by employer" },
];

const BenefitColumn = ({ title, subtitle, items }) => (
  <div className="w-full md:w-1/2 border rounded-2xl p-8 bg-[#f2fef2]">
    <h3 className="text-2xl font-bold text-center mb-1 text-black">{title}</h3>
    <p className="text-center text-gray-600 mb-6 text-sm">{subtitle}</p>
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <div className="bg-gray-100 p-2 rounded-md text-green-900">
            {item.icon}
          </div>
          <p className="text-gray-700">{item.text}</p>
        </li>
      ))}
    </ul>
  </div>
);

const BenefitsCards = () => {
  return (
    <section className="py-16 px-4 bg-green-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <BenefitColumn
          title="Benefit for Companies"
          subtitle="Create a place where people want to work and thrive."
          items={companies}
        />
        <BenefitColumn
          title="Benefit for Employees"
          subtitle="Look and feel better with clean, light and delicious food for the working week."
          items={employees}
        />
      </div>
    </section>
  );
};

export default BenefitsCards;
