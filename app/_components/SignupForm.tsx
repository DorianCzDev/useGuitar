"use client";

import { ErrorMessage } from "@hookform/error-message";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ErrorSpan from "./ErrorSpan";
import SpinnerMini from "./SpinnerMini";
import { signUp } from "../_lib/authActions";
import { useTheme } from "next-themes";

function SignupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { theme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: any) {
    if (data.password !== data.confirmPassword) {
      return toast.error("Passwords doesn't match.");
    }
    startTransition(async () => {
      const {
        data: { msg, status },
      } = await signUp(data);
      if (status !== 201) {
        toast.error(msg);
      } else {
        toast.success(msg);
        router.push("/");
      }
    });
  }

  function onError(errors: FieldErrors) {
    if (errors?.category?.message) {
      alert(errors.category.message);
    }
  }

  return (
    <div className="flex items-center flex-col h-full">
      <Link href={"/"}>
        {theme === "dark" ? (
          <img
            src="/logo-white-no-background.svg"
            alt="logo"
            className="w-[400px] object-cover aspect-[4/3]"
          />
        ) : (
          <img
            src="/logo-black.svg"
            alt="logo"
            className="w-[400px] object-cover aspect-[4/3]"
          />
        )}
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="py-10 px-10 w-[500px] bg-primary-950 border border-primary-700 rounded-xl sm:w-11/12 sm:px-4"
      >
        <div className="grid grid-rows-[1fr_auto_16px] gap-2 px-3 pb-1">
          <label className="block" htmlFor="email">
            E-mail
          </label>
          <input
            className="text-sm py-2 px-3 rounded-md bg-transparent outline-none border border-primary-700 focus:border-primary-500 tracking-wide"
            type="email"
            disabled={isPending}
            {...register("email", {
              required: "Please provide email",
              maxLength: {
                value: 50,
                message: "No more than 50 characters",
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
        <div className="grid grid-rows-[1fr_auto_16px] gap-2 px-3   pb-2">
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            className="text-sm py-2 px-3 rounded-md bg-transparent outline-none border border-primary-700 focus:border-primary-500 tracking-wide"
            type="password"
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
        <div className="grid grid-rows-[1fr_auto_16px] gap-2 px-3  pb-1">
          <label className="block" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            className="text-sm py-2 px-3 rounded-md bg-transparent outline-none border border-primary-700 focus:border-primary-500 tracking-wide"
            type="password"
            disabled={isPending}
            {...register("confirmPassword", {
              required: "Please confirm password",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="confirmPassword"
            render={({ message }) => <ErrorSpan>{message}</ErrorSpan>}
          />
        </div>
        <div className="flex flex-col pb-3 pt-4 pr-3 pl-3 gap-2 ">
          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center outline-none cursor-pointer transition-all border-none bg-secondary-500 py-4 px-6 rounded-lg hover:bg-secondary-600 text-xl tracking-widest text-white"
          >
            {isPending ? <SpinnerMini /> : "Register"}
          </button>
          <Link href={"/login"}>
            <div>
              <div className="text-secondary-500 font-bold tracking-wider cursor-pointer">
                If you are already registered, sign in.
              </div>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
