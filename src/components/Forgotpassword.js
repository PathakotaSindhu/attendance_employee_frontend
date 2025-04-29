/*import React, { useState } from "react";
import axios from "axios";  // Make sure axios is installed to make API requests
import Header from './Header';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");  // For displaying success or error message
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  /*const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      // Send email to your backend for password reset request
      const response = await axios.post('http://localhost:8080/api/auth/forgot-password', { email });

      // Handle success
      /*if (response.data.success) {
        setMessage("A password reset link has been sent to your email.");
        setMessage(response.data.message);
      } 
      else {
        setMessage("Failed to send reset link. Please try again.");
      }*/
        /*if (response.data.success) {
          setMessage(response.data.message || "A password reset link has been sent to your email.");
        } 
        else {
          setMessage("Failed to send reset link. Please try again.");
       }
        
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };*/
  /*const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }
  
    setLoading(true);
    setMessage(""); // clear old messages
  
    try {
      const response = await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
  
      // 👇 Add logs to inspect what's being returned from backend
      console.log("✅ FULL RESPONSE OBJECT:", response);
      console.log("📦 response.data:", response.data);
      console.log("🟡 Type of response.data:", typeof response.data);
  
      // Check if the response is an object with a `success` key
      if (response.data.success) {
        console.log("🎉 Backend success detected!");
        setMessage(response.data.message || "A password reset link has been sent to your email.");
      } else {
        console.log("❌ Backend did not return success:true");
        setMessage("Failed to send reset link. Please try again.");
      }
  
    } catch (error) {
      console.error("🚨 Error during forgot-password:", error);
      setMessage("An error occurred. Please try again.");
    }
  
    setLoading(false);
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div>
          <label htmlFor="email" style={{ display: "block", marginBottom: "8px" }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "20px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        {message && <p style={{ color: loading ? "blue" : "green" }}>{message}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px" }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;*/
import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/forgot-password", { email });

      console.log("✅ FULL RESPONSE OBJECT:", response);
      console.log("📦 response.data:", response.data);
      console.log("🟡 Type of response.data:", typeof response.data);

      if (response.data.success) {
        console.log("🎉 Backend success detected!");
        setMessage(response.data.message || "A password reset link has been sent to your email.");
      } else {
        console.log("❌ Backend did not return success:true");
        setMessage("Failed to send reset link. Please try again.");
      }

    } catch (error) {
      console.error("🚨 Error during forgot-password:", error);
      setMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
            />
          </div>

          {message && (
            <p className={`text-sm ${loading ? "text-blue-500" : "text-green-600"}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
              loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

