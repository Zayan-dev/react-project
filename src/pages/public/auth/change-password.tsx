import { Card, CardBody, CardHeader, Button, Divider } from "@heroui/react";
import { Lock, ArrowLeft, Mail, KeyRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type FieldValues } from "react-hook-form";
import { BaseInput } from "../../../components/common/form/base-input";
import { useChangePassword } from "../../../services/auth";

export default function ChangePassword() {
  const { control, handleSubmit } = useForm();
  const { mutate, isPending } = useChangePassword();
  const navigate = useNavigate();

  const onSubmit = (values: FieldValues) => {
    const data = {
      email: values.email,
      verificationCode: values.verificationCode,
      password: values.password,
    };
    mutate(data, {
      onSuccess: () => {
        // Redirect to login or show success
        navigate("/login");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col text-center pb-4">
          <div>
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Change Password
            </h1>
          </div>
          <p className="text-gray-600 mt-2">
            Enter your email, verification code, and new password to reset your
            password.
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <BaseInput
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              name="email"
              startContent={<Mail className="w-4 h-4 text-gray-400" />}
              rules={{ required: "Email is Required" }}
              control={control}
            />
            <BaseInput
              type="text"
              label="Verification Code"
              placeholder="Enter verification code"
              name="verificationCode"
              startContent={<KeyRound className="w-4 h-4 text-gray-400" />}
              rules={{ required: "Verification code is Required" }}
              control={control}
            />
            <BaseInput
              type="password"
              label="New Password"
              placeholder="Enter new password"
              name="password"
              startContent={<Lock className="w-4 h-4 text-gray-400" />}
              rules={{ required: "Password is Required" }}
              control={control}
            />
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={isPending}
            >
              Change Password
            </Button>
          </form>
          <Divider className="my-6" />
          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
