import React from "react";
import AuthButton from "../AuthButton";
import Link from "next/link";
import { IconDiamond } from "@tabler/icons-react";

const Nav = () => {
  return (
    <nav className="grayborder flex items-center justify-between border-b p-4">
      <Link
        href="/"
        className="grayborder flex items-center gap-1 text-lg font-medium"
      >
        <IconDiamond className="h-[30px] w-[30px]" />
        <div>
          <span className="font-bold">SOUL</span>SMITH
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <AuthButton />
      </div>
    </nav>
  );
};

export default Nav;
