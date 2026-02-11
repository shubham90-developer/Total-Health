import CustomBtn from "@/app/components/CustomBtn";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-16 px-4">
      <div className="bg-white w-full max-w-md rounded shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-200 text-black text-center py-4 px-6">
          <h2 className="text-xl font-semibold">
            Log in to Totally Healthy Life
          </h2>
        </div>

        {/* Form */}
        <form className="px-6 py-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-yellow-100 border border-gray-300 px-4 py-2 rounded text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-yellow-100 border border-gray-300 px-4 py-2 rounded text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <CustomBtn type="submit" className="w-full py-2 px-4 block">
            LOG IN
          </CustomBtn>

          <div className="flex items-center justify-end text-xs">
            <Link
              href="forgot-pass"
              className="text-black font-semibold hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </form>

        {/* Divider */}
        <hr className="my-2 border-gray-300" />

        {/* Register */}
        <div className="text-center text-sm pb-6">
          Not a member yet?{" "}
          <Link
            href="register"
            className="text-green-900 font-semibold underline"
          >
            Click here to register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
