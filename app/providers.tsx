// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [supabaseClient] = useState(() => createClientComponentClient<any>());
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <div className="flex min-h-screen flex-col">{children}</div>
      </SessionContextProvider>
    </NextUIProvider>
  );
}
