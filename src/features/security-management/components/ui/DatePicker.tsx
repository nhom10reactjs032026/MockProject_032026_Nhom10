import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../styles/react-datepicker-tailwind.css";

export default function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
}: {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}) {
  return (
    <div className="w-[180px]">
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        placeholderText={placeholder}
        dateFormat="dd/MM/yyyy"
        isClearable
        className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        popperPlacement="bottom-start"
        showPopperArrow={false}
      />
    </div>
  );
}