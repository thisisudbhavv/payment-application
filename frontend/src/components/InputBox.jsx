export function InputBox({ label, placeholder, type }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-1">{label}</div>
      <input
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-300"
        type={type}
        required="yes"
      />
    </div>
  );
}
