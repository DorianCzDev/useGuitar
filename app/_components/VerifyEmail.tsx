"use client";

import { useEffect } from "react";
import { verifyEmail } from "../_lib/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function VerifyEmail({
  email,
  verificationToken,
}: {
  email: string;
  verificationToken: string;
}) {
  const router = useRouter();
  useEffect(() => {
    async function sendData() {
      const { msg, status } = await verifyEmail({ email, verificationToken });
      if (status === 200) {
        toast.success(msg);
      }
      router.push("/");
    }
    sendData();
  }, []);
  return <></>;
}

export default VerifyEmail;
