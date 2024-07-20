import ResetPasswordForm from "@/app/_components/ResetPasswordForm";
import Link from "next/link";

function Page({
  searchParams,
}: {
  searchParams: {
    email: string;
    forgotPasswordToken: string;
  };
}) {
  const { email, forgotPasswordToken } = searchParams;
  return (
    <div className="flex items-center flex-col h-full">
      <Link href={"/"}>
        <img
          src="/logo-white-no-background.svg"
          className="w-[400px] object-cover aspect-[4/3]"
        />
      </Link>
      <ResetPasswordForm
        email={email}
        forgotPasswordToken={forgotPasswordToken}
      />
    </div>
  );
}

export default Page;
