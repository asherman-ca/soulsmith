import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <main className="page-container">
      <div className="content-container">
        <h3 className="flex items-center text-xs" aria-label="builder header">
          Soulstone Survivors
          <span className="flex items-center text-gray-300">
            <IconChevronRight height={16} width={16} />
            Tiers
          </span>
        </h3>
        <div className="flex">
          <h1 className="rounded-md bg-foreground-500 p-2 text-lg font-bold text-bg100">
            Under Construction ⚒️
          </h1>
        </div>
      </div>
    </main>
  );
};

export default page;
