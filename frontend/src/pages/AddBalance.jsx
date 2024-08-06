import { Appbar } from "../components/Appbar";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useState } from "react";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";

export function AddBalance() {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <div>
      <Appbar />
      <div className="w-80 p-8">
        <div className="">
          <InputBox
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            label={"Enter amount"}
            type={"number"}
          />
          <div className="pt-4">
            <Button
              label="Add"
              onClick={() => {
                axios
                  .post(
                    "https://payment-application-88r5.onrender.com/api/v1/account/addBalance",
                    {
                      amount,
                    },
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((Response) => {
                    if (Response.status == 200) {
                      setMessage("Added Successfully");
                    }
                  });
              }}
            />
          </div>
          <BottomWarning
            to={"/dashboard"}
            buttonText={"Go back to dashboard"}
          />
          {message && (
            <div className="mt-2 text-center text-green-950">{message}</div>
          )}
        </div>
      </div>
    </div>
  );
}
