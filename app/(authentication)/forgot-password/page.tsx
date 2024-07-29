import ForgotPasswordForm from "@/app/_components/ForgotPasswordForm";
import Link from "next/link";

export const metadata = {
  title: "Forgot Password",
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
      <ForgotPasswordForm />
    </div>
  );
}

export default Page;
