import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
  addToast,
} from "@heroui/react";
import { Mail, ArrowLeft, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPassword } from "../../../services/auth";
import { BaseInput } from "../../../components/common/form/base-input";
import { useForm, type FieldValues } from "react-hook-form";

export default function ForgotPassword() {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { mutate, isPending } = useForgotPassword();
  const onSubmit = (values: FieldValues) => {
    const data = {
      email: values.email,
    };
    mutate(data, {
      onSuccess: () => {
        addToast({
          description: "Verification code sent to your email",
        });
        navigate("/change-password");
      },
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col text-center pb-4">
            <div>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Forgot Password
              </h1>
            </div>
            <p className="text-gray-600 mt-2">
              Enter your email address and we'll send you an email to reset your
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
                rules={{
                  required: "Email is Required",
                }}
                control={control}
              />
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isPending}
              >
                Send Reset Code
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
    </>
  );
}
