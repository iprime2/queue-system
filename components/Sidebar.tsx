"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";

import {
  LayoutDashboardIcon,
  LogOutIcon,
  MonitorIcon,
  School2Icon,
  SettingsIcon,
  TicketIcon,
  User2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboardIcon,
    color: "text-sky-500",
  },
  {
    label: "Token",
    href: "/admin/token",
    icon: TicketIcon,
    color: "text-green-700",
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: User2,
    color: "text-pink-700",
  },
  {
    label: "Departments",
    href: "/admin/departments",
    icon: School2Icon,
    color: "text-orange-700",
  },
  {
    label: "Counter",
    href: "/admin/counter",
    icon: MonitorIcon,
    color: "text-orange-700",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: SettingsIcon,
    color: "text-teal-500",
  },
  {
    label: "Logout",
    href: "/logout",
    icon: LogOutIcon,
    color: "text-gray-700",
  },
];
const Sidebar = () => {
  const pathName = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center w-full pl-3 mb-14">
          <div className="relative w-[100%] h-12 mr-4 ">
            <Image fill alt="logo" src="/mit_logo_white.png" />
          </div>
          {/* <h1 className={cn('text-2xl font-bold', montserrat.className)}>
            MindSpark
          </h1> */}
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathName === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
