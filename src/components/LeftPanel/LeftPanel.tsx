import ExpressionSelector from "../ExpressionSelector/ExpressionSelector";

interface LeftPanelProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}
const LeftPanel: React.FC<LeftPanelProps> = ({ inputValue, setInputValue }) => {
  return (
    <div className="left-panel">
      <ExpressionSelector></ExpressionSelector>
    </div>
  );
};

export default LeftPanel;
