// shrey-lab/components/Forms.tsx
//
// Form controls. All have lime focus states, mono labels via the Field wrapper.

import * as React from 'react';

/* ─── Checkbox ──────────────────────────────────────────────────── */
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, description, className = '', id, ...rest }, ref) {
    const autoId = React.useId();
    const inputId = id || autoId;
    return (
      <label htmlFor={inputId} className={`flex items-start gap-3 cursor-pointer group ${className}`}>
        <span className="relative inline-flex shrink-0 mt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className="peer absolute inset-0 opacity-0 cursor-pointer"
            {...rest}
          />
          <span className="w-[18px] h-[18px] rounded-sm border border-border-strong bg-bg-elevated transition-all duration-fast ease-out peer-checked:bg-lime-400 peer-checked:border-lime-500 peer-focus-visible:shadow-focus flex items-center justify-center">
            <svg
              viewBox="0 0 16 16"
              className="w-3 h-3 text-ink-900 opacity-0 peer-checked:opacity-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 'var(--checked-op, 0)' }}
            >
              <path d="M3 8.5l3 3 7-7" />
            </svg>
          </span>
        </span>
        {(label || description) && (
          <span className="flex flex-col gap-0.5">
            {label && <span className="text-sm text-fg leading-snug">{label}</span>}
            {description && <span className="text-2xs text-fg-muted leading-snug">{description}</span>}
          </span>
        )}
      </label>
    );
  }
);

/* ─── Radio ────────────────────────────────────────────────────── */
interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  function Radio({ label, description, className = '', id, ...rest }, ref) {
    const autoId = React.useId();
    const inputId = id || autoId;
    return (
      <label htmlFor={inputId} className={`flex items-start gap-3 cursor-pointer ${className}`}>
        <span className="relative inline-flex shrink-0 mt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            className="peer absolute inset-0 opacity-0 cursor-pointer"
            {...rest}
          />
          <span className="w-[18px] h-[18px] rounded-full border border-border-strong bg-bg-elevated transition-all duration-fast ease-out peer-checked:border-lime-500 peer-focus-visible:shadow-focus flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-lime-400 opacity-0 peer-checked:opacity-100" />
          </span>
        </span>
        {(label || description) && (
          <span className="flex flex-col gap-0.5">
            {label && <span className="text-sm text-fg leading-snug">{label}</span>}
            {description && <span className="text-2xs text-fg-muted leading-snug">{description}</span>}
          </span>
        )}
      </label>
    );
  }
);

/* ─── Switch / Toggle ──────────────────────────────────────────── */
interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
}
export function Switch({ checked, defaultChecked, onChange, label, disabled, id }: SwitchProps) {
  const autoId = React.useId();
  const switchId = id || autoId;
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : internal;
  const handleClick = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!isOn);
    onChange?.(!isOn);
  };
  return (
    <label htmlFor={switchId} className={`inline-flex items-center gap-3 ${disabled ? 'opacity-50' : 'cursor-pointer'}`}>
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={isOn}
        disabled={disabled}
        onClick={handleClick}
        className={`relative inline-flex h-6 w-11 rounded-full border transition-colors duration-base ease-in-out focus-visible:shadow-focus ${
          isOn
            ? 'bg-lime-400 border-lime-500'
            : 'bg-bg-sunken border-border-strong'
        }`}
      >
        <span
          className="absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-bg-elevated shadow-sm transition-transform duration-base ease-in-out"
          style={{ transform: isOn ? 'translateX(20px)' : 'translateX(0)' }}
        />
      </button>
      {label && <span className="text-sm text-fg">{label}</span>}
    </label>
  );
}

/* ─── Select ───────────────────────────────────────────────────── */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ options, className = '', ...rest }, ref) {
    return (
      <div className="relative inline-block w-full max-w-sm">
        <select
          ref={ref}
          className={`font-sans text-sm pl-3 pr-10 py-2.5 w-full rounded-md border border-border-strong bg-bg-elevated text-fg appearance-none cursor-pointer transition-[border-color,box-shadow] duration-fast ease-out focus:outline-none focus:border-lime-400 focus:shadow-[0_0_0_3px_rgba(168,225,12,0.18)] ${className}`}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-fg-muted"
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
    );
  }
);

/* ─── Search input ─────────────────────────────────────────────── */
interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  shortcut?: string;
  onClear?: () => void;
}
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput({ shortcut, onClear, className = '', value, ...rest }, ref) {
    const hasValue = value !== undefined && value !== '';
    return (
      <div className="relative inline-flex items-center w-full max-w-md">
        <svg
          aria-hidden="true"
          className="absolute left-3 text-fg-muted pointer-events-none"
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
        </svg>
        <input
          ref={ref}
          type="search"
          value={value}
          className={`font-sans text-sm w-full pl-9 ${shortcut || hasValue ? 'pr-16' : 'pr-3'} py-2.5 rounded-md border border-border-strong bg-bg-elevated text-fg placeholder:text-fg-subtle transition-[border-color,box-shadow] duration-fast ease-out focus:outline-none focus:border-lime-400 focus:shadow-[0_0_0_3px_rgba(168,225,12,0.18)] ${className}`}
          {...rest}
        />
        {hasValue && onClear ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={onClear}
            className="absolute right-3 text-fg-muted hover:text-fg transition-colors duration-fast"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        ) : shortcut ? (
          <span className="absolute right-3 font-mono text-2xs px-1.5 py-0.5 rounded-sm border border-border-strong bg-bg-sunken text-fg-muted">
            {shortcut}
          </span>
        ) : null}
      </div>
    );
  }
);

/* ─── Slider ───────────────────────────────────────────────────── */
interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  showValue?: boolean;
}
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  function Slider({ label, showValue, className = '', value, defaultValue, min = 0, max = 100, ...rest }, ref) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {(label || showValue) && (
          <div className="flex justify-between items-baseline">
            {label && (
              <span className="font-mono text-2xs tracking-wide text-fg-muted lowercase before:content-['//_']">
                {label}
              </span>
            )}
            {showValue && (
              <span className="font-mono text-2xs text-fg">
                {value ?? defaultValue}
              </span>
            )}
          </div>
        )}
        <input
          ref={ref}
          type="range"
          value={value}
          defaultValue={defaultValue}
          min={min}
          max={max}
          className="lab-slider"
          {...rest}
        />
        <style>{`
          .lab-slider {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 4px;
            background: var(--bg-sunken);
            border-radius: var(--radius-full);
            outline: none;
            cursor: pointer;
          }
          .lab-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px; height: 18px;
            border-radius: 50%;
            background: var(--lime-400);
            border: 2px solid var(--bg);
            box-shadow: var(--shadow-sm);
            cursor: grab;
            transition: transform var(--duration-fast) var(--ease-out);
          }
          .lab-slider::-webkit-slider-thumb:hover { transform: scale(1.1); }
          .lab-slider::-webkit-slider-thumb:active { cursor: grabbing; transform: scale(1.05); }
          .lab-slider::-moz-range-thumb {
            width: 18px; height: 18px;
            border-radius: 50%;
            background: var(--lime-400);
            border: 2px solid var(--bg);
            cursor: grab;
          }
        `}</style>
      </div>
    );
  }
);
