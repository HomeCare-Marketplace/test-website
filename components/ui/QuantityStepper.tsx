type QuantityStepperProps = {
  value: number;
  onChange: (next: number) => void;
  inputId: string;
  min?: number;
};

export function QuantityStepper({ value, onChange, inputId, min = 1 }: QuantityStepperProps) {
  return (
    <div className="mt-2 flex w-32 items-center justify-between rounded-full border border-oat px-3 py-2">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} aria-label="Decrease quantity">
        -
      </button>
      <input
        id={inputId}
        type="number"
        min={min}
        value={value}
        onChange={(event) => onChange(Math.max(min, Number(event.target.value) || min))}
        className="w-10 bg-transparent text-center text-sm"
        inputMode="numeric"
      />
      <button type="button" onClick={() => onChange(value + 1)} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}
