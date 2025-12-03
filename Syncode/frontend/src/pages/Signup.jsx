import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-background-light dark:bg-background-dark px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#11d462]">
          Create Account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded border border-slate-300 dark:border-slate-600 bg-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded border border-slate-300 dark:border-slate-600 bg-transparent"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded border border-slate-300 dark:border-slate-600 bg-transparent"
          />
        </div>

        <p className="text-center mt-4 text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
