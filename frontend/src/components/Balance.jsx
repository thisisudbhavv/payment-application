import { useNavigate } from "react-router-dom";

export function Balance({ value }) {
  const navigate = useNavigate();

  const redirectAdd = () => {
    navigate("/add");
  };
  return (
    <div>
      <div className="flex flex-row pt-5">
        <div className=" text-xl font-bold text-gray-800 pr-3">
          Your Balance
        </div>
        <div className="text-xl font-semibold text-gray-600">₹{value}</div>
      </div>
      <div className="pt-5 w-60">
        <button
          onClick={redirectAdd}
          type="button"
          className="w-full text-white bg-green-800 hover:bg-green-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Add Balance
        </button>
      </div>
    </div>
  );
}
