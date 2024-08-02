export function Balance({ value }) {
  return (
    <div className="flex flex-row pt-5">
      <div className=" text-xl font-bold text-gray-800 pr-3">Your Balance</div>
      <div className="text-xl font-semibold text-gray-600">₹{value}</div>
    </div>
  );
}
