"use client";

import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import UserUpdateForm from "./UserUpdateForm";
import { useRouter } from "next/navigation";
import useAuth from "../_hooks/useAuth";

function UserUpdate() {
  const [isLoading, setLoading] = useState(true);
  const data = useAuth({ setLoading });
  const router = useRouter();
  if (isLoading) return <Spinner />;
  if (data.status !== 200 || !data.user) {
    return router.push("/login");
  }
  const user = { ...data.user };
  return (
    <div>
      <UserUpdateForm user={user} />
    </div>
  );
}

export default UserUpdate;
