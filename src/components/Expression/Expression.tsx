import React from "react";
import Input from "../Input/Input";

interface ExpressionProps {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Expression: React.FC<ExpressionProps> = ({
  inputValue,
  handleInputChange,
}) => {
  return (
    <>
      <Input
        inputValue={inputValue}
        handleInputChange={handleInputChange}
      ></Input>
      <p className="typed-text">
        You typed: <strong>{inputValue}</strong>
      </p>
    </>
  );
};

export default Expression;
