import VerifyEmail from "@/app/_components/VerifyEmail";

export const metadata = {
  title: "Verify email",
};

function Page({
  searchParams,
}: {
  searchParams: { email: string; verificationToken: string };
}) {
  const { email, verificationToken } = searchParams;
  return <VerifyEmail email={email} verificationToken={verificationToken} />;
}

export default Page;
