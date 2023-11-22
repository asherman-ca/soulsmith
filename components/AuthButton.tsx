import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button, Link } from "@nextui-org/react";
import { IconLogin, IconLogout } from "@tabler/icons-react";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      {user.email}
      <form action={signOut}>
        <Button
          radius="full"
          variant="faded"
          className="p-2"
          type="submit"
          isIconOnly
        >
          <IconLogout />
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Button
        as={Link}
        radius="sm"
        variant="faded"
        className="buttonfont px-4"
        href="/login"
        // isIconOnly
      >
        <IconLogin className="h-4 w-4 rotate-180" />
        Login
      </Button>
    </div>
  );
}
