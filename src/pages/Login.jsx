import { useState } from "react";
import usersApi from "../api/userapi";

export default function Login() {
  const [username, setUsername] = useState(""); // match backend field
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await usersApi.post("login/", { username, password });
      console.log(res.data);
      alert("Login successful!");
      localStorage.setItem("access", res.data.tokens.access);
      localStorage.setItem("refresh", res.data.tokens.refresh);
    } catch (err) {
  console.log(err.response?.data);
  alert(err.response?.data?.non_field_errors || "Invalid credentials");
}
  };

  return (
    <div className="mt-6">
      <label className="block font-semibold">Username</label>
      <input
        type="text"
        className="w-full border p-2 mb-4"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label className="block font-semibold">Password</label>
      <div className="flex border mb-2">
        <input
          type="password"
          className="flex-1 p-2"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="text-right text-sm text-red-600 mb-4 cursor-pointer">
        Forget Password?
      </div>

      <button
        className="bg-teal-800 text-white py-2 px-6 rounded-lg"
        onClick={handleLogin}
      >
        Log In
      </button>

      <div className="text-center mt-4 font-semibold">Or</div>

      <button className="w-full border py-2 mt-4">Continue with Google</button>

      <div className="text-center mt-4 text-sm">
        Don’t have an account?{" "}
        <span className="text-red-600 cursor-pointer">Register</span>
      </div>
    </div>
  );
}
