"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuth from "../_hooks/useAuth";
import ChangePasswordForm from "./ChangePasswordForm";
import Spinner from "./Spinner";

function ChangePassword() {
  const [isLoading, setLoading] = useState(true);
  const data = useAuth({ setLoading });
  const router = useRouter();
  if (isLoading) return <Spinner />;
  if (data.status !== 200 || !data.user) {
    return router.push("/login");
  }

  return (
    <div>
      <ChangePasswordForm />
    </div>
  );
}

export default ChangePassword;
