import React from "react";
import "./style.scss";

interface PropTypes {
  children?: React.ReactChild | React.ReactChild[];
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button: React.FC<PropTypes> = (props) => {
  const { children, onClick, className } = props;
  
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
