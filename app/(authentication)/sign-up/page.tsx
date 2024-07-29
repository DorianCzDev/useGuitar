import SignupForm from "@/app/_components/SignupForm";
import Link from "next/link";

export const metadata = {
  title: "Sign up",
};

function Page() {
  return (
    <div className="flex items-center flex-col h-full">
      <Link href={"/"}>
        <img
          src="/logo-white-no-background.svg"
          className="w-[400px] object-cover aspect-[4/3]"
        />
      </Link>
      <SignupForm />
    </div>
  );
}

export default Page;
