import { cn } from "@/utils/tw";
import Link from "next/link";
import React, { FC } from "react";

interface SideBarLinkProps {
  link: {
    url: string;
    name: string;
    icon: React.ReactNode;
  };
  pathname: string;
}

const SideBarLink: FC<SideBarLinkProps> = ({ link, pathname }) => {
  const [effect, setEffect] = React.useState(false);

  return (
    <Link
      key={link.url}
      href={link.url}
      className={cn(
        "group flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-[#3F3F45]",
        {
          "bg-[#3F3F45]": pathname === link.url,
        },
      )}
      // onClick={() => setEffect(true)}
    >
      {React.cloneElement(link.icon as React.ReactElement, {
        className: `${
          effect && "animate-wiggle"
        } group-hover:animate-wiggleinfinite`,
        // onAnimationEnd: () => setEffect(false),
      })}
      <span>{link.name}</span>
    </Link>
  );
};

export default SideBarLink;
