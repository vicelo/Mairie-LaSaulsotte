interface ProgressBarProps {
  value: number; // 0-100
  bloque?: boolean;
}

export function ProgressBar({ value, bloque = false }: ProgressBarProps) {
  const fillColor = value === 100 ? "bg-primary" : bloque ? "bg-accent" : "bg-primary";

  return (
    <div className="flex items-center gap-2">
      <div
        className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Avancement : ${value}%`}
      >
        <div
          className={`h-2 rounded-full transition-all ${fillColor}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-8 text-right text-xs font-medium tabular-nums text-gray-500">
        {value}%
      </span>
    </div>
  );
}
