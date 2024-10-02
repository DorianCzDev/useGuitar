"use client";

import { ErrorMessage } from "@hookform/error-message";
import { useTransition } from "react";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import ErrorSpan from "./ErrorSpan";
import SpinnerMini from "./SpinnerMini";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { forgotPassword } from "../_lib/userActions";
import Link from "next/link";
import { useTheme } from "next-themes";

function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const { theme } = useTheme();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: FieldValues) {
    const { email } = data;
    startTransition(async () => {
      const { data } = await forgotPassword({ email });
      if (data.status === 200) {
        toast.success(data.msg);
        router.push("/login");
      } else {
        toast.error(data.msg);
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
        className="py-6 px-10 w-[500px] bg-primary-950 border border-primary-700 rounded-xl sm:w-11/12 sm:px-4"
      >
        <div className="grid grid-rows-[1fr_auto_16px] gap-2 px-3 pb-1">
          <label className="block" htmlFor="email">
            Please provide your email
          </label>
          <input
            className="text-sm py-2 px-3 rounded-md bg-transparent outline-none border border-primary-700 focus:border-primary-500 tracking-wide"
            type="email"
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
        <div className="flex flex-col pb-3 pt-2 pr-3 pl-3 gap-2 ">
          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center outline-none cursor-pointer transition-all border-none bg-secondary-500 py-4 px-6 rounded-lg hover:bg-secondary-600 text-xl tracking-widest text-fontPrimary-500 text-slate-50"
          >
            {isPending ? <SpinnerMini /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
