import React from "react";

interface SliderInputProps {
  id: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}

const SliderInput: React.FC<SliderInputProps> = ({
  id,
  min,
  max,
  step = 0.01,
  value,
  onChange,
}) => {
  return (
    <div className="slider-input">
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span>{value}</span>
    </div>
  );
};

export default SliderInput;
