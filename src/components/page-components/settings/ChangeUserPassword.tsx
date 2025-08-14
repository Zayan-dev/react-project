import { Mail } from "lucide-react";
import { BaseInput } from "../../common/form/base-input";
import { useForm, type FieldValues } from "react-hook-form";
import { useChangePassword } from "../../../services/auth";
import BaseButton from "../../common/base-button";
import { useNavigate } from "react-router-dom";

export default function ChangeUserPassword() {
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm();
  const { mutate, isPending } = useChangePassword();
  const onSubmit = (values: FieldValues) => {
    const data = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    mutate(data, {
      onSuccess: () => {
        // Redirect to login or show success
        navigate("/home");
      },
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium">Old Password</label>
          <BaseInput
            type="text"
            label="Old Password"
            placeholder="Enter your Old Password"
            name="oldPassword"
            startContent={<Mail className="w-4 h-4 text-gray-400" />}
            rules={{ required: "Password is Required" }}
            control={control}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">New Password</label>
          <BaseInput
            type="text"
            label="New Password"
            placeholder="Enter your New Password"
            name="newPassword"
            startContent={<Mail className="w-4 h-4 text-gray-400" />}
            rules={{ required: "Password is Required" }}
            control={control}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Confirm New Password
          </label>
          <BaseInput
            type="text"
            label="Confirm Password"
            placeholder="Enter your New Password again"
            name="confirmPassword"
            startContent={<Mail className="w-4 h-4 text-gray-400" />}
            rules={{
              required: "Password is Required",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            }}
            control={control}
          />
        </div>

        <BaseButton
          type="submit"
          className="w-full  text-white py-2 rounded-md"
        >
          {isPending ? "Updating..." : "Change Password"}
        </BaseButton>
      </form>
    </div>
  );
}
