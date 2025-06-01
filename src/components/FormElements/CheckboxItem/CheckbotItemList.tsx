import React, { ChangeEvent, ReactNode } from "react";

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
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      {children}
    </div>
  );
};

export default CheckboxItemList;
