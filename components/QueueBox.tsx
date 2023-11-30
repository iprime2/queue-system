import React, { FC } from "react";

type QueueBoxProps = {
  title: string;
  content: string;
};

const QueueBox: FC<QueueBoxProps> = ({ title, content }) => {
  return (
    <div className="flex">
      <h3 className="font-medium">{title}</h3>
      <p className="">{content}</p>
    </div>
  );
};

export default QueueBox;
