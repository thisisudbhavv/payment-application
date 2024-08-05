import axios from "axios";
import { useEffect, useState } from "react";

export function Appbar() {
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get("https://payment-application-88r5.onrender.com/api/v1/user/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBalance(response.data.firstName);
      });
  }, []);

  return (
    <div className="flex flex-row justify-between px-8 py-5 border-b-2 top-0 sticky">
      <div className="font-bold text-2xl">Payment App</div>
      <div className="flex flex-row justify-between">
        <div className="relative inline-flex items-center justify-center font-medium pr-4">
          Hello, {user}
        </div>
        <div class="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-slate-200 rounded-full">
          <span>U</span>
        </div>
      </div>
    </div>
  );
}
