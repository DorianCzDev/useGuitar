"use client";

import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import UserUpdateForm from "./UserUpdateForm";

function UserUpdate() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/auth")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <Spinner />;

  const user = { ...data.user };
  return (
    <div>
      <UserUpdateForm user={user} />
    </div>
  );
}

export default UserUpdate;
