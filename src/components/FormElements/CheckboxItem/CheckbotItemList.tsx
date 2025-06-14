import React, { ChangeEvent, ReactNode } from "react";
import "./CheckboxItemList.scss";
interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}

const CheckboxItemList: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  children,
}) => {
  return (
    <div className="checkbox-item">
      <input
        type="checkbox"
        className="checkbox-input"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      {children}
    </div>
  );
};

export default CheckboxItemList;
