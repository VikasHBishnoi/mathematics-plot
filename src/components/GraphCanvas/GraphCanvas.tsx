import { ExpressionInterface } from "../../Interface";
import "./GraphCanvas.scss";
interface GraphCanvasProps {
  expressionArray: ExpressionInterface[];
}

const MainCanvasArea: React.FC<GraphCanvasProps> = ({ expressionArray }) => (
  <div className="main-canvas-area">
    {/* Replace this with your actual canvas or plotting logic */}
    <h2>Main Canvas Area</h2>
    <div>
      {expressionArray.map((expression, index) => (
        <div key={"expressioncanvas" + index} className="expression-item">
          {expression.isEquationShown && (
            <p>{`Equation: ${expression.equationInputStr}`}</p>
          )}
        </div>
      ))}
    </div>
    <canvas
      width={600}
      height={400}
      style={{ background: "#f9f9f9", border: "1px solid #ccc" }}
    />
  </div>
);

export default MainCanvasArea;
