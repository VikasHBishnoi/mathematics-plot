import { ChangeEvent, useState } from "react";
import Expression from "../Expression/Expression";

const ExpressionSelector: React.FC = () => {
  const [expressionArray, setExpressionArray] = useState<string[]>([
    "x+2",
    "x^2+2",
  ]);
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setExpressionArray((prv) => {
      const newArray = [...prv];
      newArray[index] = event.target.value;
      return newArray;
    });
  };

  return (
    <div className="expression-selector">
      <h2>Expression Selector</h2>
      {expressionArray.map((expression, index) => (
        <Expression
          key={index}
          inputValue={expression}
          handleInputChange={(e) => handleInputChange(e, index)}
        />
      ))}
    </div>
  );
};

export default ExpressionSelector;
