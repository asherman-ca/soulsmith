"use client";
import { IconBadges, IconHammer, IconUserCircle } from "@tabler/icons-react";
import { FC } from "react";
import { IconHome } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import SideBarLink from "./SideBarLink";

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
              <SideBarLink key={link.url} link={link} pathname={pathname} />
            );
          })}
        </div>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
};

export default WithSidebar;
