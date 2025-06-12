import React from "react";
import Input from "../FormElements/Input/Input";
import EquationCanvas from "../EquationCanvas/EquationCanvasProps";
import { ExpressionInterface } from "../../Interface";

interface ExpressionProps {
  expressionId: string;
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  expression: ExpressionInterface;
  onDelete: () => void;
}
const Expression: React.FC<ExpressionProps> = ({
  expressionId,
  inputValue,
  handleInputChange,
  expression,
  onDelete,
}) => {
  return (
    <div className="expression-container">
      <div className="expression-interaction">
        <Input
          id={expressionId}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
        />
        <button
          type="button"
          onClick={onDelete}
          style={{
            background: "#ff4d4f",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "4px 8px",
            cursor: "pointer",
          }}
          aria-label="Delete Expression"
          title="Delete Expression"
        >
          &#10006;
        </button>
      </div>
      <EquationCanvas expression={expression} />
    </div>
  );
};

export default Expression;
