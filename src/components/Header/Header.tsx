import React, { useState } from "react";
import "./Header.scss";
import FeedbackPopup from "../FeedbackPopup/FeedbackPopup";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <button className="info-btn" onClick={() => setShowFeedback(true)}>
        Rules & Examples
      </button>
      <FeedbackPopup
        title={"How to Use"}
        open={showFeedback}
        onClose={() => setShowFeedback(false)}
        buttons={[
          { label: "Close", onClick: () => setShowFeedback(false) }
        ]}
      >
        <ul>
          <li>
            Enter equations using <b>x</b> (e.g.,{" "}
            <code>2*x^2 + 3*x + 5</code>).
          </li>
          <li>Use <b>+</b> and <b>-</b> for addition and subtraction.</li>
          <li>Use <b>*</b> for multiplication and <b>^</b> for powers.</li>
          <li>
            Examples:
            <ul>
              <li>
                <code>x^2 + 2*x + 1</code>
              </li>
              <li>
                <code>3*x^4 - 5*x + 7</code>
              </li>
              <li>
                <code>sin(x)</code> (if supported)
              </li>
            </ul>
          </li>
        </ul>
      </FeedbackPopup>
    </header>
  );
};

export default Header;