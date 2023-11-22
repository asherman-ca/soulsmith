"use client";
import { IconBadges, IconHammer, IconUserCircle } from "@tabler/icons-react";
import { FC } from "react";
import { IconHome } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/tw";

interface WithSidebarProps {
  children: React.ReactNode;
}

const links = [
  {
    url: "/",
    name: "Home",
    icon: <IconHome />,
  },
  {
    url: "/profile",
    name: "Profile",
    icon: <IconUserCircle />,
  },
  {
    url: "/build",
    name: "Build Planner",
    icon: <IconHammer />,
  },
  {
    url: "/tier",
    name: "Tier List",
    icon: <IconBadges />,
  },
];

const WithSidebar: FC<WithSidebarProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-1">
      <div className="grayborder flex w-64 flex-col border-r p-4">
        <div className="flex flex-col gap-2">
          {links.map((link) => {
            return (
              <Link
                href={link.url}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-[#3F3F45]",
                  {
                    "bg-[#3F3F45]": pathname === link.url,
                  },
                )}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
};

export default WithSidebar;
