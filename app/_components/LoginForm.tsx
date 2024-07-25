"use client";

import { ErrorMessage } from "@hookform/error-message";
import { StatusCodes } from "http-status-codes";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { login } from "../_lib/actions";
import ErrorSpan from "./ErrorSpan";
import SpinnerMini from "./SpinnerMini";

function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const { email, password } = data;
    startTransition(async () => {
      const { status, msg } = await login({ email, password });
      if (status === StatusCodes.OK) {
        toast.success(msg);
        redirect("/");
      } else {
        toast.error(msg);
      }
    });
  }

  function onError(errors) {
    if (errors?.category?.message) {
      alert(errors.category.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="py-6 px-10 w-[500px] bg-primary-950 border border-primary-700 rounded-xl sm:w-11/12 sm:px-4"
    >
      <div className="grid grid-rows-[1fr_auto_16px] gap-2 px-3 pt-4">
        <label className="block" htmlFor="email">
          E-mail
        </label>
        <input
          className="text-sm py-2 px-3 rounded-md bg-transparent outline-none border border-primary-700 focus:border-primary-500 tracking-wide"
          type="email"
          autoComplete="email"
          disabled={isPending}
          {...register("email", {
            required: "Please provide email",
            maxLength: {
              value: 20,
              message: "No more than 20 characters",
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <ErrorSpan>{message}</ErrorSpan>}
        />
      </div>
      <div className="grid grid-rows-[1fr_auto_16px] gap-2 px-3 pb-4">
        <label className="block" htmlFor="password">
          Password
        </label>
        <input
          className="text-sm py-2 px-3 rounded-md bg-transparent outline-none border border-primary-700 focus:border-primary-500 tracking-wide"
          type="password"
          autoComplete="password"
          disabled={isPending}
          {...register("password", {
            required: "Please provide password",
            minLength: {
              value: 6,
              message: "Password cannnot be shorter than 6 characters",
            },
            maxLength: {
              value: 20,
              message: "Password cannot be longer than 20 characters",
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <ErrorSpan>{message}</ErrorSpan>}
        />
      </div>
      <div className="flex flex-col p-3 gap-2">
        <button
          disabled={isPending}
          type="submit"
          className="flex w-full items-center justify-center min-h-16 outline-none cursor-pointer transition-all border-none bg-secondary-500 py-4 px-6 rounded-lg hover:bg-secondary-600 text-xl tracking-widest text-white"
        >
          {isPending ? <SpinnerMini /> : "Login"}
        </button>
        <Link href="/forgot-password">
          <div className="text-secondary-500 font-bold tracking-wider cursor-pointer">
            I forgot password
          </div>
        </Link>
        <Link href="/sign-up">
          <div className="text-secondary-500 font-bold tracking-wider cursor-pointer">
            If you aren't registered, please sign up.
          </div>
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
