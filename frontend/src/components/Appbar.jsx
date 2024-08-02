export function Appbar() {
  return (
    <div className="flex flex-row justify-between px-8 py-5 border-b-2">
      <div className="font-bold text-2xl">Payment App</div>
      <div className="flex flex-row justify-between">
        <div className="relative inline-flex items-center justify-center font-medium pr-4">
          Hello, User
        </div>
        <div class="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-slate-200 rounded-full">
          <span>U</span>
        </div>
      </div>
    </div>
  );
}
