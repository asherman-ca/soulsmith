import { createClient } from "@/utils/supabase/server";
// import Link from "next/link";
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
    <Button
      as={Link}
      radius="full"
      variant="faded"
      className="p-2"
      href="/login"
      isIconOnly
    >
      <IconLogin />
    </Button>
  );
}
