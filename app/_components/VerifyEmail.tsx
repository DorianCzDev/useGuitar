"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { verifyEmail } from "../_lib/authActions";

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
      const { data } = await verifyEmail({ email, verificationToken });
      if (data.status === 200) {
        toast.success(data.msg);
      }
      router.push("/");
    }
    sendData();
  }, []);
  return <></>;
}

export default VerifyEmail;
