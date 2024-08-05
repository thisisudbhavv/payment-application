import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useNavigate, Link, redirect } from "react-router-dom";

export function User() {
  const navigate = useNavigate();

  const [userName, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  const [firstNameNew, setFirstnamenew] = useState("");
  const [lastNameNew, setLastnamenew] = useState("");
  const [passwordNew, setPasswordnew] = useState("");

  useEffect(() => {
    axios
      .get("https://payment-application-88r5.onrender.com/api/v1/user/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUsername(response.data.account.username);
        setFirstname(response.data.account.firstName);
        setLastname(response.data.account.lastName);
      });
  }, []);

  const redirectToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <Appbar />
      <div className="grid grid-cols-1 md:grid-cols-2 p-8">
        <div>
          <div className="text-xl text-gray-700 font-medium">
            You are logged-in as:
          </div>
          <div className="font-bold text-5xl py-2 text-blue-900">
            {firstName} {lastName}
          </div>
          <div className="pt-8 text-gray-700 font-medium text-xl">
            Your Email:
          </div>
          <div className="py-2 text-3xl font-semibold text-blue-900">
            {userName}
          </div>
        </div>
        <div>
          <div className="font-bold text-4xl">Edit your details:</div>
          <div className="py-4 mr-40">
            <InputBox
              onChange={(e) => {
                setPasswordnew(e.target.value);
              }}
              label={"Password"}
              placeholder={"123456"}
              type={"password"}
            />
            <InputBox
              onChange={(e) => {
                setFirstnamenew(e.target.value);
              }}
              label={"First Name"}
              placeholder={"John"}
            />
            <InputBox
              onChange={(e) => {
                setLastnamenew(e.target.value);
              }}
              label={"Last Name"}
              placeholder={"Doe"}
            />
          </div>
          <div className="mr-40">
            <Button
              onClick={() => {
                axios.put(
                  "https://payment-application-88r5.onrender.com/api/v1/user/update",
                  {
                    password: passwordNew,
                    firstName: firstNameNew,
                    lastName: lastNameNew,
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                );
              }}
              label={"Update"}
            />
            <Button label={"Go back Dashboard"} onClick={redirectToDashboard} />
          </div>
        </div>
      </div>
    </div>
  );
}
