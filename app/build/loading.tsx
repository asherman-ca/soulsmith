import { IconDiamond } from "@tabler/icons-react";
import { FC } from "react";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <IconDiamond className="animate-wiggleinfinite h-20 w-20" />
    </div>
  );
};

export default loading;
