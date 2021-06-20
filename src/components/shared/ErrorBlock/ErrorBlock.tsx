import React from "react";

interface IProps {
    // eslint-disable-next-line react/require-default-props
    text?: string;
}

export const ErrorBlock = ({ text = "An error occured" }: IProps) => (
  <div className="error-block">
    <div className="error-block__text">{text}</div>
  </div>
);
