import React, { useState } from "react";

interface InputProps {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input: React.FC<InputProps> = ({ inputValue, handleInputChange }) => {
  return (
    <input
      type="text"
      className="function-input"
      placeholder="Enter your function here"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};
export default Input;
