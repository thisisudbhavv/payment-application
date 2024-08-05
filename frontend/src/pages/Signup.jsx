import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-slate-200 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign Up" />
          <SubHeading label="Enter your information to create your account" />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            label="First Name"
            placeholder="John"
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label="Last Name"
            placeholder="Doe"
          />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label="Email"
            placeholder="johndoe@gmail.com"
            type="email"
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label="Password"
            placeholder="*******"
            type="password"
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "https://payment-application-88r5.onrender.com/api/v1/user/signup",
                  {
                    username,
                    firstName,
                    lastName,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
              }}
              label="Sign Up"
            />
          </div>
          <BottomWarning
            label="Already have an account?"
            buttonText="Sign In"
            to="/"
          />
        </div>
      </div>
    </div>
  );
}
