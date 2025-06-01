import { ChangeEvent, SetStateAction, useState } from "react";
import Expression from "../Expression/Expression";
import CheckboxItemList from "../FormElements/CheckboxItem/CheckbotItemList";
import { ExpressionInterface } from "../../Interface";

interface ExpressionSelectorProps {
  expressionArray: ExpressionInterface[];
  setExpressionArray: React.Dispatch<SetStateAction<ExpressionInterface[]>>;
}
const ExpressionSelector: React.FC<ExpressionSelectorProps> = ({
  expressionArray,
  setExpressionArray,
}) => {
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setExpressionArray((prv) => {
      const newArray = [...prv];
      newArray[index].equationInputStr = event.target.value;
      return newArray;
    });
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    setExpressionArray((prev) => {
      const newExpression = [...prev];
      newExpression[index].isEquationShown = checked;
      return newExpression;
    });
  };

  return (
    <div className="expression-selector">
      <h2>Expression Selector</h2>
      {expressionArray.map((expression, index) => (
        <CheckboxItemList
          key={"expression" + index}
          id={"checkbox" + index}
          checked={expression.isEquationShown}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleCheckboxChange(index, e.target.checked);
          }}
        >
          <Expression
            inputValue={expression.equationInputStr}
            handleInputChange={(e) => handleInputChange(e, index)}
          />
        </CheckboxItemList>
      ))}
    </div>
  );
};

export default ExpressionSelector;
