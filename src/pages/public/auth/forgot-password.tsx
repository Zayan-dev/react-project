import { useForm, type FieldValues } from "react-hook-form";
import { BaseInput } from "../../../components/common/form/base-input";
import BaseButton from "../../../components/common/base-button";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const submitForm = (values: FieldValues) => {
    console.log("values: ", values);
  };
  return (
    <div className="bg-base-darkGray h-screen flex justify-center items-center">
      <div className="w-1/2  bg-slate-700 text-black min-h-24 rounded-base flex flex-col p-4 py-8 items-center">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl font-semibold text-base-orange">
            Reset Password
          </h2>
          <p className="text-white">
            We'll help you get back into your account
          </p>
        </div>
        <form
          className="self-start flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(submitForm)}
        >
          <BaseButton
            className="text-base-orange bg-transparent w-fit"
            startContent={
              <div className="flex justify-center items-center">&larr;</div>
            }
            onPress={() => {
              navigate("/login");
            }}
          >
            Back to Login
          </BaseButton>
          <BaseInput
            labelPlacement="outside"
            placeholder="Enter your email address and we'll send you a link to reset your password."
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

          <BaseButton className="bg-base-orange !text-white" type="submit">
            Send Reset Link
          </BaseButton>
        </form>
      </div>
    </div>
  );
}
