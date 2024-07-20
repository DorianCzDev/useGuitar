import VerifyEmail from "@/app/_components/VerifyEmail";

function Page({ searchParams }) {
  const { email, verificationToken } = searchParams;
  return <VerifyEmail email={email} verificationToken={verificationToken} />;
}

export default Page;
