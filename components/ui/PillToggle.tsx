type PillToggleProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
  size?: "sm" | "md";
};

export function PillToggle({ label, selected, onClick, size = "md" }: PillToggleProps) {
  const sizeClasses = size === "sm" ? "px-3 py-1 text-xs" : "px-3 py-1.5 text-sm";

  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`rounded-full border ${sizeClasses} transition-colors duration-150 ${selected ? "border-ink bg-ink text-white" : "border-oat text-ink hover:border-stone"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
