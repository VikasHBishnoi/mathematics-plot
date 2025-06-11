import { ChangeEvent, SetStateAction } from "react";
import Expression from "../Expression/Expression";
import CheckboxItemList from "../FormElements/CheckboxItem/CheckbotItemList";
import { ExpressionInterface, ExpressionParameters } from "../../Interface";

interface ExpressionSelectorProps {
  expressionArray: ExpressionInterface[];
  setExpressionArray: React.Dispatch<SetStateAction<ExpressionInterface[]>>;
}
const ExpressionSelector: React.FC<ExpressionSelectorProps> = ({
  expressionArray,
  setExpressionArray,
}) => {
  const parseEquationParameters = (
    inputValue: string
  ): {
    equationParamtersArray: ExpressionParameters[];
    constant: number;
  } => {
    // Normalize input: remove spaces, replace (x^...) with x^...
    let input = inputValue.replace(/\s+/g, "");
    input = input.replace(/\(x\^([^)]+)\)/g, "x^$1");

    // Match terms like 2*x^5, 2x^0.4, -x^2, +3.5*x, -4x, x, -x, etc.
    const termRegex = /([+-]?[\d.]*)(\*?)x(?:\^([+-]?[\d.]+))?/gi;
    const equationParamtersArray: ExpressionParameters[] = [];
    let match;

    // Extract x terms
    while ((match = termRegex.exec(input)) !== null) {
      let coefficientStr = match[1];
      let powerStr = match[3];

      // Handle cases like x or -x (no coefficient)
      let coefficient: number;
      if (coefficientStr === "" || coefficientStr === "+") {
        coefficient = 1;
      } else if (coefficientStr === "-") {
        coefficient = -1;
      } else {
        coefficient = Number(coefficientStr);
      }

      // Default power is 1 if not specified
      let power = powerStr !== undefined ? Number(powerStr) : 1;

      equationParamtersArray.push({ coefficient, power });
    }

    // Remove all x terms (including their coefficients and exponents)
    const inputWithoutXTerms = input.replace(termRegex, "");

    // Match standalone constants (e.g., +245, -7.5)
    let constant = 0;
    const constantMatches = inputWithoutXTerms.match(/[+-]?[\d.]+/g);
    if (constantMatches) {
      constant = constantMatches.map(Number).reduce((a, b) => a + b, 0);
    }

    return {
      equationParamtersArray,
      constant,
    };
  };
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = event.target.value;
    setExpressionArray((prv) => {
      const newArray = [...prv];
      newArray[index].equationInputStr = inputValue;
      newArray[index].equationParamters = parseEquationParameters(inputValue);
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
            expressionId={"expression" + index}
            inputValue={expression.equationInputStr}
            expression={expression}
            handleInputChange={(e) => handleInputChange(e, index)}
          />
        </CheckboxItemList>
      ))}
    </div>
  );
};

export default ExpressionSelector;
