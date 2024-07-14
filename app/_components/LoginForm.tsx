"use client";

import { useState } from "react";
import { login } from "../_lib/actions";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { StatusCodes } from "http-status-codes";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      action={async (formData) => {
        const { status, msg } = await login(formData);
        if (status === StatusCodes.OK) {
          toast.success(msg);
          redirect("/");
        } else {
          setPassword("");
          setEmail("");
          toast.error(msg);
        }
      }}
      className="py-6 px-10 w-[500px] bg-primary-950 border border-primary-700 rounded-xl"
    >
      <div className="flex flex-col p-3 gap-3">
        <label className="block" htmlFor="email">
          E-mail
        </label>
        <input
          className="text-sm py-2 px-3 rounded-md bg-transparent outline-none border border-primary-700 focus:border-primary-500 tracking-wide"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col p-3 gap-3">
        <label className="block" htmlFor="password">
          Password
        </label>
        <input
          className="text-sm py-2 px-3 rounded-md bg-transparent outline-none border border-primary-700 focus:border-primary-500 tracking-wide"
          type="password"
          name="password"
          autoComplete="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col p-3 gap-2">
        <button
          type="submit"
          className="flex w-full items-center justify-center outline-none cursor-pointer transition-all border-none bg-secondary-500 py-4 px-6 rounded-lg hover:bg-secondary-600 text-xl tracking-widest text-white"
        >
          Login
        </button>
        <div className="text-secondary-500 font-bold tracking-wider cursor-pointer">
          I forgot password
        </div>
        <div className="text-secondary-500 font-bold tracking-wider cursor-pointer">
          If you aren't registered, please sign up.
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
