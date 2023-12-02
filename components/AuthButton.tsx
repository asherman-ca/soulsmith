import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button, Link } from "@nextui-org/react";
import { IconLogin, IconLogout } from "@tabler/icons-react";
import ProfileForm from "./ProfileForm";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profileData;

  if (user) {
    const { data: profileResponse } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user!.id);

    profileData = profileResponse;
  }

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  // const updateUsername = async (data) => {
  //   "use server";

  //   console.log(data);
  //   const cookieStore = cookies();
  //   const supabase = createClient(cookieStore);
  //   const { error } = await supabase
  //     .from("profiles")
  //     .update({ username: data })
  //     .eq("id", user!.id);
  // };

  return user ? (
    <div className="flex items-center gap-4">
      {user.email}
      <ProfileForm
        userId={user.id}
        initialUsername={profileData![0].username}
      />
      <form action={signOut}>
        <Button
          radius="md"
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
