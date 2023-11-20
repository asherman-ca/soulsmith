import {
  IconBadges,
  IconDiamond,
  IconHammer,
  IconUserCircle,
} from "@tabler/icons-react";
import { FC } from "react";
import { IconHome } from "@tabler/icons-react";
import Link from "next/link";

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

const WithSidebar: FC<WithSidebarProps> = async ({ children }) => {
  return (
    <div className="flex flex-1 text-gray-300">
      <div className="grayborder flex flex-col border-r pb-6">
        <Link
          href="/"
          className="grayborder flex h-[90px] items-center gap-2 border-b px-6 text-xl font-medium"
        >
          <IconDiamond className="h-[30px] w-[30px]" />
          SoulSmith
        </Link>
        <div className="">
          {links.map((link) => {
            return (
              <Link
                href={link.url}
                className="flex cursor-pointer items-center gap-3 p-6 hover:bg-[#3F3F45]"
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
