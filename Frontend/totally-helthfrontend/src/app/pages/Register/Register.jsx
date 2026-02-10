import CustomBtn from "@/app/components/CustomBtn";
import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <div className="py-16 bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl rounded shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-200 text-black text-center py-4 px-6">
          <h2 className="text-xl font-semibold">
            New customer? Please sign up! Click here
          </h2>
        </div>

        <form className="space-y-10 p-6">
          {/* Personal Details */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Personal details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First name*" className="input" />
              <input type="text" placeholder="Last name*" className="input" />
              <input
                type="email"
                placeholder="Email address*"
                className="input"
              />
              <input
                type="password"
                placeholder="Password*"
                className="input"
              />
              <select className="input border border-gray-300 rounded-lg text-sm">
                <option>Prefer not to say</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <input
                type="tel"
                placeholder="Home/Office telephone*"
                className="input"
              />
              <div className="md:col-span-2">
                <label htmlFor="dob" className="block text-sm mb-1">
                  Date of Birth
                </label>
                <input type="date" className="input w-full" />
              </div>
            </div>
          </section>

          {/* Optional Info */}
          <section>
            <h3 className="text-lg font-semibold mb-4">
              We'd love to get to know you better (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nationality" className="input" />
              <input
                type="text"
                placeholder="Your industry"
                className="input"
              />
            </div>
          </section>

          {/* Delivery Address */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>
            <div className="flex gap-6 mb-4">
              {["Home", "Work", "Other"].map((label) => (
                <label key={label} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="delivery" />
                  {label}
                </label>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Street name/number"
                className="input"
              />
              <input
                type="text"
                placeholder="Suite number / Building name"
                className="input"
              />
              <input
                type="text"
                placeholder="Villa/Flat/Office number"
                className="input"
              />
              <input type="text" placeholder="Landmark" className="input" />
            </div>
          </section>

          {/* Delivery Selection */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Delivery</h3>
            <div className="flex gap-6 mb-4">
              {["Abu Dhabi", "Dubai", "Al Ain"].map((city) => (
                <label key={city} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="city" />
                  {city}
                </label>
              ))}
            </div>
            <select className="input border border-gray-300 rounded-lg text-sm py-2 px-4">
              <option>Please select your area</option>
              <option>Downtown</option>
              <option>JLT</option>
              <option>Deira</option>
            </select>
          </section>

          {/* From Location & Consent */}
          <section>
            <h3 className="text-lg font-semibold mb-4">
              Your order will be sent from
            </h3>
            <hr className="border-green-500 mb-4" />

            {/* Consent */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 text-sm leading-relaxed">
                <input type="checkbox" className="mt-1 w-3 accent-green-600" />
                <span>
                  I would like to sign up to receive email updates and offers
                  from Totally healthy. See{" "}
                  <a href="#" className="underline text-green-700">
                    privacy policy
                  </a>
                  .
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm leading-relaxed">
                <input type="checkbox" className="mt-1 accent-green-600" />
                <span>
                  I can confirm that I have read and accepted the{" "}
                  <a href="#" className="underline text-green-700">
                    terms and conditions
                  </a>
                  .
                </span>
              </label>
            </div>
          </section>

          {/* Submit Button */}
          <div className="text-center">
            <CustomBtn type="submit" className="py-2 px-4 block">
              SUBMIT REGISTRATION
            </CustomBtn>
          </div>
        </form>

        {/* Divider */}
        <hr className="my-4 border-gray-300" />

        {/* Already Member */}
        <div className="text-center text-sm pb-6">
          Already a member of Totally Healthy Life?{" "}
          <Link href="login" className="text-green-900 font-semibold underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
