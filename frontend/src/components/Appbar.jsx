import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function Appbar() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://payment-application-88r5.onrender.com/api/v1/user/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUser(response.data.account.firstName);
      });
  }, []);

  const redirectToUser = () => {
    navigate("/user");
  };

  return (
    <div className="flex flex-row justify-between px-8 py-2 border-b-2 top-0 sticky">
      <div className="font-bold text-2xl relative inline-flex items-center">
        Payment App
      </div>
      <div className="flex flex-row items-center">
        <div className="relative inline-flex items-center justify-center font-medium pr-4">
          Hello, {user}
        </div>
        <div class="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-slate-200 rounded-full">
          <span onClick={redirectToUser}>{user[0]}</span>
        </div>
        <div className="pl-4 pt-2">
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            label={"Logout"}
          />
        </div>
      </div>
    </div>
  );
}
