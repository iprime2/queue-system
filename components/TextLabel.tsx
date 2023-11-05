"use client";

import { FC } from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

interface TextLabelProps {
  text: string;
}

const TextLabel: FC<TextLabelProps> = ({ text }) => {
  return (
    <div className="w-full flex hover:bg-slate-400/50 hover:rounded-md cursor-pointer p-1 px-3">
      <p className="font-medium text-sm text-slate-500">{text}</p>s
      {/* <Button onClick={signOut}>{text} </Button> */}
    </div>
  );
};

export default TextLabel;
