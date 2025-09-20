import { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";


export default function AuthTabs() {
  const [active, setActive] = useState("login");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <div className="flex">
        <button
          className={`flex-1 py-2 font-bold ${active === "login" ? "bg-teal-800 text-white" : "bg-gray-200"}`}
          onClick={() => setActive("login")}
        >
          Log in
        </button>
        <button
          className={`flex-1 py-2 font-bold ${active === "register" ? "bg-teal-800 text-white" : "bg-gray-200"}`}
          onClick={() => setActive("register")}
        >
          Register
        </button>
      </div>

      {active === "login" ? <Login /> : <Register />}
    </div>
  );
}
