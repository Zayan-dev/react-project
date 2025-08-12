import { useForm, type FieldValues } from "react-hook-form";
import { BaseInput } from "../../../components/common/form/base-input";
import BaseButton from "../../../components/common/base-button";
import { Link } from "react-router-dom";

export default function Login() {
  const { control, handleSubmit } = useForm();
  const onSubmit = (values: FieldValues) => {
    console.log("values: ", values);
  };
  return (
    <div className="bg-base-darkGray min-h-screen flex justify-center items-center">
      <div className="sm:w-1/2 w-[80%] bg-slate-700 gap-8 text-black min-h-24 rounded-base flex flex-col p-4 py-8 items-center">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl font-semibold text-base-orange">
            Welcome Back
          </h2>
          <p className="text-white">
            Sign in to continue to your account
          </p>
        </div>
        <form
          className="self-start flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <BaseInput
            labelPlacement="outside"
            placeholder="Enter Email"
            label="Email"
            type="email"
            classNames={{
              label: "!text-white",
              inputWrapper: "!bg-slate-700 border border-white rounded-base ",
              input: "!text-white",
            }}
            control={control}
            rules={{ required: "Email is required" }}
            name="email"
          />

          <BaseInput
            labelPlacement="outside"
            placeholder="Enter Password"
            label="Password"
            type="password"
            classNames={{
              label: "!text-white",
              inputWrapper: "!bg-slate-700 border border-white rounded-base ",
              input: "!text-white",
            }}
            rules={{ required: "Password is required" }}
            control={control}
            name="password"
          />
          <BaseButton className="!text-white bg-base-orange" type="submit">
            Login
          </BaseButton>
        </form>
        <div className="mt-4 flex flex-col items-center w-full  gap-4">
          <p className="flex items-center gap-4 text-base-gray p-4 border-t-1 border-base-gray w-full justify-center">
            Forgot Password?{" "}
            <Link
              className="hover:border-b-2 transition-all  text-base-orange border-base-orange "
              to={"/forgot-password"}
            >
              Reset
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
