import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // MOCK LOGIN CHECK (you can modify this as needed)
    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter email and password.");
      return;
    }

    // Simulate login success
    alert("Login Successful (Mock Login)");

    // Redirect to Upload Page
    navigate("/upload");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background-light dark:bg-background-dark px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow">
        <h2 className="text-2xl font-bold text-[#11d462] mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded border border-slate-300 dark:border-slate-600 bg-transparent"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded border border-slate-300 dark:border-slate-600 bg-transparent"
          />

          <button
            type="submit"
            className="w-full bg-[#11d462] text-white py-3 rounded-md hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-slate-600 dark:text-slate-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
