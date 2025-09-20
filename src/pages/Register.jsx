import { useState } from "react";
import api from "../api";
import usersApi from "../api/userapi";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleRegister = async () => {
    if (!agree) return alert("You must agree to Terms & Conditions!");
    try {
    await usersApi.post("register/", { username, email, password });
      alert("Registration successful!");
    } catch (err) {
  console.log(err.response.data);
 alert(JSON.stringify(err.response.data));
}
  };

  return (
    <div className="mt-6">
      <label className="block font-semibold">Email id</label>
      <input
        type="email"
        className="w-full border p-2 mb-4"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="block font-semibold">Username</label>
      <input
        type="text"
        className="w-full border p-2 mb-4"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label className="block font-semibold">Password</label>
      <input
        type="password"
        className="w-full border p-2 mb-4"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          className="mr-2"
          checked={agree}
          onChange={() => setAgree(!agree)}
        />
        <span>I have read and agreed to the Terms and Conditions and Privacy Policy</span>
      </div>

      <button
        className="bg-teal-800 text-white py-2 px-6 rounded-lg"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
}
