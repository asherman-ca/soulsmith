import { IconDiamond } from "@tabler/icons-react";
import { FC } from "react";

interface WithSidebarProps {
  children: React.ReactNode;
}

const WithSidebar: FC<WithSidebarProps> = ({ children }) => {
  return (
    <div className="flex flex-1">
      <div className="grayborder flex flex-col border-r pb-6">
        <h1 className="grayborder flex h-[90px] items-center gap-2 border-b px-6 text-xl font-medium">
          <IconDiamond className="h-[30px] w-[30px]" />
          SoulSmith
        </h1>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
};

export default WithSidebar;
