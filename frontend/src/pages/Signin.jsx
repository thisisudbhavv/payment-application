import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-slate-200 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign In" />
          <SubHeading label="Enter your credentials to access your account" />
          <InputBox
            label="Email"
            placeholder="johndoe@gmail.com"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="email"
          />
          <InputBox
            label="Password"
            placeholder={"**********"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
          />
          <div className="pt-4">
            <Button
              onClick={() => {
                axios.post(
                  "https://payment-application-88r5.onrender.com/api/v1/user/signin",
                  {
                    username,
                    password,
                  }
                );
              }}
              label="Sign In"
            />
          </div>
          <BottomWarning
            label="Don't have a account?"
            buttonText="Sign Up"
            to="/signup"
          />
        </div>
      </div>
    </div>
  );
}
