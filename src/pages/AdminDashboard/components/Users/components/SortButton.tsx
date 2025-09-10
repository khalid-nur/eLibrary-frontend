import { PiArrowsDownUpLight } from "react-icons/pi";

interface SortButtonProps {
  order: string;
  onToggle: () => void;
}

const SortButton = ({ order, onToggle }: SortButtonProps) => {
  return (
    <button
      className="flex items-center gap-1 px-3 py-1 bg-zinc-800 text-white rounded-md hover:opacity-90 transition"
      onClick={onToggle}
    >
      <div className={`inline-flex items-center ${order === "asc" ? "flex-col" : "flex-col-reverse"}`}>
        <span className="text-sm">A</span>
        <span className="text-sm">Z</span>
      </div>
      <PiArrowsDownUpLight size={25} />
    </button>
  );
};

export default SortButton;
