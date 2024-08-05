import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";

export function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://payment-application-88r5.onrender.com/api/v1/user/bulk")
      .then((response) => {
        setUsers(response.data.user);
      });
  }, []);

  return (
    <div>
      <div className="text-2xl font-bold text-left pt-5 pb-3">Users</div>
      <div className="my-2">
        <input
          placeholder="Search Users....."
          className="w-full px-2 py-1 border rounded border-slate-300"
        />
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
}

function User({ user }) {
  return (
    <div className="flex justify-between border-b-2 py-2">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-1">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button label={"Send Money"} />
      </div>
    </div>
  );
}
