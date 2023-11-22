import React from "react";
import AuthButton from "../AuthButton";

const Nav = () => {
  return (
    <nav className="grayborder flex h-[80px] items-center justify-between border-b p-6">
      <h1 className="flex items-center text-lg font-medium">
        Soulstone Survivors
      </h1>
      <div className="flex items-center gap-4">
        <AuthButton />
      </div>
    </nav>
  );
};

export default Nav;
