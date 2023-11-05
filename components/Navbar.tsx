"use client";

import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TextLabel from "@/components/TextLabel";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const Navbar = () => {
  const logout = async () => {
    await signOut();
  };
  return (
    <div className="flex px-5 py-2 shadow-md item-center h-[90px] border-b justify-between">
      <Image src="/logo.png" alt="MITWPU Logo" width={100} height={300} />
      <Popover>
        <PopoverTrigger>
          <div className="flex p-1 items-center justify-center border rounded-3xl gap-1 my-auto cursor-pointer">
            <Avatar>
              <AvatarImage src="/userAvatar.jpg" />
            </Avatar>
            <ChevronDownIcon className="w-5 h-5" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-30 p-2">
          <div className="flex items-center justify-center flex-col gap-2">
            <TextLabel text={"Profile"} />
            {/* <TextLabel text={"Logout"} /> */}
            <Button onClick={logout}>Logout</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Navbar;
