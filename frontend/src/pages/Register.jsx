import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);
  
  const validate = () => {
    if (!name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    const regex =/^\S+@\S+\.\S+$/;
    if (!regex.test(email)) return "Enter a valid email address";
    if (!password) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters long";
    if (password !== confirmPassword)
      return "Passwords do not match";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setError(data?.message || "Registration failed");
        setLoading(false);
        return;
      }
      const { token, user } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
      setLoading(false);
     
    } catch (err) {
      setError("Network error — please try again");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-700 shadow-lg rounded-2xl p-8 border border-gray-500"
      >
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="flex flex-col items-start block text-sm font-medium text-white mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg bg-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="flex flex-col items-start block text-sm font-medium text-white mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg bg-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="flex flex-col items-start block text-sm font-medium text-white mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg bg-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="flex flex-col items-start block text-sm font-medium text-white mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg bg-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 mt-2 rounded-lg font-semibold text-white transition 
            ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-300 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
