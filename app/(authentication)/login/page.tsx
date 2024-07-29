import LoginForm from "@/app/_components/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Login",
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
      <LoginForm />
    </div>
  );
}

export default Page;
