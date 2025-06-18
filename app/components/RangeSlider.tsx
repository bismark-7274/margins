"use client";

import { SyntheticEvent, useEffect, useRef, useState } from "react";

interface Props {
  defaultValue?: string;
  label?: string;
  value?: string;
  min: string;
  max: string;
  step: string;
  onChange: (value: string) => void;
}

const RangeSlider = ({
  min,
  max,
  step,
  label,
  onChange,
  defaultValue,
}: Props) => {
  const [rangeValue, setRangeValue] = useState<string>("0");

  const handleRangePicker = (e: SyntheticEvent<HTMLInputElement>) => {
    setRangeValue(e.currentTarget.value);
  };

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hasMounted = useRef(false);
  useEffect(() => {
    if (hasMounted.current) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        onChange(rangeValue);
      }, 1500);

      return () => {
        clearTimeout(timeoutRef.current);
      };
    } else {
      hasMounted.current = true;
    }
  }, [rangeValue]);

  return (
    <div className="w-full max-w-xs">
      {label && (
        <label htmlFor="rating" className="text-xs">
          {label}
        </label>
      )}
      <div className="flex gap-3">
        <input
          id="rating"
          type="range"
          min={min}
          max={max}
          defaultValue={defaultValue}
          className="range"
          step={step}
          onChange={(e) => handleRangePicker(e)}
        />
        <strong>{rangeValue}</strong>
      </div>
    </div>
  );
};

export default RangeSlider;
