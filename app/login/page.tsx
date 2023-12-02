"use client";

import { createClient } from "@/utils/supabase/client";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { IconBrandGoogleFilled, IconUserCircle } from "@tabler/icons-react";

const getURL = () => {
  let url = process?.env?.NEXT_PUBLIC_SITE_URL as string;
  // Make sure to include https:// when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing /.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const supabase = createClient();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignUp: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast.error("Authentication failed");
    } else {
      toast.success("Check your email for the confirmation link");
      router.refresh();
    }
  };

  const handleSignIn: SubmitHandler<Inputs> = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    const { error } = await supabase.auth.signInWithPassword(payload);
    if (error) {
      toast.error("Authentication failed");
      console.log("error", error);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const handleGuest = async () => {
    const payload = {
      email: "soulsmithguest@yahoo.com",
      password: "password",
    };
    const { error } = await supabase.auth.signInWithPassword(payload);
    if (error) {
      console.log("error", error);
      toast.error("Authentication failed");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getURL()}auth/callback`,
      },
    });
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-background">
      <a
        href="/"
        className="bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm text-foreground no-underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </a>
      <div className="border-border100 flex flex-col gap-8 rounded-md border-2 p-8 md:border-1">
        <h1 className="text-2xl font-semibold text-blue-500">SoulSmith</h1>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Sign in to SoulSmith</h2>
          <p>Not your device? Use a private or incognito window to sign in.</p>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            label="Email"
            type="email"
            errorMessage={errors.email && errors.email.message}
            variant="bordered"
            classNames={{ inputWrapper: ["border-border100"] }}
          />
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            classNames={{ inputWrapper: ["border-border100"] }}
            label="Password"
            type="password"
            errorMessage={errors.password && errors.password.message}
            variant="bordered"
          />
          <div className="flex w-full gap-4">
            <Button
              onClick={handleSubmit(handleSignIn)}
              variant="bordered"
              className="border-border100 flex-1"
            >
              Sign in
            </Button>
            <Button
              onClick={handleSubmit(handleSignUp)}
              variant="bordered"
              className="border-border100 flex-1"
            >
              Sign up
            </Button>
          </div>

          <div className="relative flex justify-center">
            <p className="z-10 bg-white px-2 text-center text-sm dark:bg-black">
              OR
            </p>
            <div className="absolute left-0 top-[50%] w-full border-b-2 border-foreground-200"></div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={handleGoogleSignIn}
              className="border-border100 flex-1"
              variant="bordered"
              startContent={<IconBrandGoogleFilled className="h-4 w-4" />}
            >
              <p>Sign in with Google</p>
            </Button>

            <Button
              onClick={handleGuest}
              className="border-border100 flex-1"
              variant="bordered"
              startContent={<IconUserCircle className="h-4 w-4" />}
            >
              Sign in as Guest
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
