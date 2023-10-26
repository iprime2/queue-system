import { FC } from "react";

interface MainBodyProps {
  children: React.ReactNode;
}

const MainBody: FC<MainBodyProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col p-5 px-8 space-y-2 item-center">
      {children}
    </div>
  );
};

export default MainBody;
