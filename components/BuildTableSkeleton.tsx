import { Card, Skeleton } from "@nextui-org/react";
import { FC } from "react";

interface BuildTableSkeletonProps {}

const BuildTableSkeleton: FC<BuildTableSkeletonProps> = ({}) => {
  return (
    <div>
      {[1, 2, 3].map(() => (
        <Card className="border-border100 bg-bg100 border-2 p-4" radius="md">
          <Skeleton className="rounded-md">
            <div className="h-24 rounded-md bg-default-300"></div>
          </Skeleton>
        </Card>
      ))}
    </div>
  );
};

export default BuildTableSkeleton;
