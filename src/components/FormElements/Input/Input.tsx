import React, { useState } from "react";

interface InputProps {
  id: string;
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input: React.FC<InputProps> = ({ id, inputValue, handleInputChange }) => {
  return (
    <input
      id={id}
      type="text"
      className="function-input"
      placeholder="Enter your function here"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};
export default Input;
