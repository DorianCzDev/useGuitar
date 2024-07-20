"use client";

import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import ChangePasswordForm from "./ChangePasswordForm";

function ChangePassword() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/api/auth")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <Spinner />;

  if (data.status !== 200) {
    return router.push("/login");
  }
  return (
    <div>
      <ChangePasswordForm />
    </div>
  );
}

export default ChangePassword;
