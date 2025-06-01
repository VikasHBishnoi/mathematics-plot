import React from "react";
import Input from "../FormElements/Input/Input";
import EquationCanvas from "../EquationCanvas/EquationCanvasProps";
import { ExpressionInterface } from "../../Interface";

interface ExpressionProps {
  expressionId: string;
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  expression: ExpressionInterface;
}
const Expression: React.FC<ExpressionProps> = ({
  expressionId,
  inputValue,
  handleInputChange,
  expression,
}) => {
  return (
    <>
      <Input
        id={expressionId}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
      ></Input>
      <EquationCanvas expression={expression}></EquationCanvas>
    </>
  );
};

export default Expression;
