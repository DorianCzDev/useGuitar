"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuth from "../_hooks/useAuth";
import ChangePasswordForm from "./ChangePasswordForm";
import Spinner from "./Spinner";
import { UserDataType } from "../_types/types";

function ChangePassword() {
  const [isLoading, setLoading] = useState(true);
  const data: UserDataType | null = useAuth({ setLoading });
  const router = useRouter();
  if (isLoading) return <Spinner />;
  if (data?.status !== 200 || !data?.user) {
    router.push("/login");
  }

  return (
    <div>
      <ChangePasswordForm />
    </div>
  );
}

export default ChangePassword;
