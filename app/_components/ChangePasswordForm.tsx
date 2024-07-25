import { ErrorMessage } from "@hookform/error-message";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import ErrorSpan from "./ErrorSpan";
import SpinnerMini from "./SpinnerMini";
import toast from "react-hot-toast";
import { updateUserPassword } from "../_lib/actions";

function ChangePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const { newPassword, confirmNewPassword, currPassword } = data;
    if (newPassword !== confirmNewPassword) {
      return toast.error("Passwords doesn't match.");
    }
    startTransition(async () => {
      const { status, msg } = await updateUserPassword({
        newPassword,
        currPassword,
      });
      if (status === 200) {
        toast.success(msg);
      } else toast.error(msg);
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
      className="w-[600px] mx-auto sm:w-11/12"
    >
      <div className="grid grid-rows-[1fr_auto_16px] gap-2 px-3 pb-2">
        <label className="block" htmlFor="currPassword">
          Current password
        </label>
        <input
          className="text-sm py-2 px-3 rounded-md bg-transparent outline-none border border-primary-700 focus:border-primary-500 tracking-wide"
          type="password"
          disabled={isPending}
          {...register("currPassword", {
            required: "Please provide current password",
          })}
        />
        <ErrorMessage
          errors={errors}
          name="currPassword"
          render={({ message }) => <ErrorSpan>{message}</ErrorSpan>}
        />
      </div>
      <div className="grid grid-rows-[1fr_auto_16px] gap-2 px-3  pb-1">
        <label className="block" htmlFor="newPassword">
          New password
        </label>
        <input
          className="text-sm py-2 px-3 rounded-md bg-transparent outline-none border border-primary-700 focus:border-primary-500 tracking-wide"
          type="password"
          disabled={isPending}
          {...register("newPassword", {
            required: "Please provide new password",
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
          name="newPassword"
          render={({ message }) => <ErrorSpan>{message}</ErrorSpan>}
        />
      </div>
      <div className="grid grid-rows-[1fr_auto_16px] gap-2 px-3  pb-1">
        <label className="block" htmlFor="confirmNewPassword">
          Confirm new password
        </label>
        <input
          className="text-sm py-2 px-3 rounded-md bg-transparent outline-none border border-primary-700 focus:border-primary-500 tracking-wide"
          type="password"
          disabled={isPending}
          {...register("confirmNewPassword", {
            required: "Please confirm password",
          })}
        />
        <ErrorMessage
          errors={errors}
          name="confirmNewPassword"
          render={({ message }) => <ErrorSpan>{message}</ErrorSpan>}
        />
      </div>
      <div className="flex flex-col pb-3 pt-6 pr-3 pl-3 gap-2 ">
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center outline-none cursor-pointer transition-all border-none bg-secondary-500 py-4 px-6 rounded-lg hover:bg-secondary-600 text-xl tracking-widest text-white min-h-16"
        >
          {isPending ? <SpinnerMini /> : "Save"}
        </button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
