import { ChangeEvent, SetStateAction} from "react";
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
    // Match terms like 2x^2, -3x, x, -x
    const paramRegex = /([+-]?\d*)x(?:\^(\d+))?/g;
    const equationParamtersArray: ExpressionParameters[] = [];
    let match;

    while ((match = paramRegex.exec(inputValue)) !== null) {
      let coefficient =
        match[1] === "" || match[1] === "+"
          ? 1
          : match[1] === "-"
            ? -1
            : Number(match[1]);
      let power = match[2] ? Number(match[2]) : 1;
      equationParamtersArray.push({ coefficient, power });
    }

    // Match constant term (e.g., +5 or -7)
    let constant = 0;
    // Remove all terms with x (including their coefficients and exponents)
    const inputWithoutXTerms = inputValue.replace(
      /([+-]?\d*\*?x(\^\d+)?)/g,
      ""
    );
    // Now match standalone numbers
    const constantMatches = inputWithoutXTerms.match(/([+-]?\d+)/g);
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
