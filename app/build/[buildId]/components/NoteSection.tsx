"use client";
import { FC, useEffect, useState } from "react";

interface NoteSectionProps {
  description?: string;
}

const NoteSection: FC<NoteSectionProps> = ({ description }) => {
  const [mounted, isMounted] = useState(false);

  useEffect(() => {
    isMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <p className="whitespace-pre-line text-sm">
      <div>{description}</div>
    </p>
  );
};

export default NoteSection;
