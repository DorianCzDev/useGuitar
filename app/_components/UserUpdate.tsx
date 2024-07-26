"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuth from "../_hooks/useAuth";
import Spinner from "./Spinner";
import UserUpdateForm from "./UserUpdateForm";
import { UserDataType } from "../_types/types";

function UserUpdate() {
  const [isLoading, setLoading] = useState(true);
  const data: UserDataType | null = useAuth({ setLoading });
  const router = useRouter();
  if (isLoading) return <Spinner />;
  if (data?.status !== 200 || data?.user) {
    router.push("/login");
  }
  const user = { ...data?.user };
  return (
    <div>
      <UserUpdateForm user={user} />
    </div>
  );
}

export default UserUpdate;
