import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export function Dashboard() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://payment-application-88r5.onrender.com/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setBalance(response.data.balance);
      });
  }, []);

  return (
    <div>
      <Appbar />
      <div className="px-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
}
