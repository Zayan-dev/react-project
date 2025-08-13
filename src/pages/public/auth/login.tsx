import { useForm, type FieldValues } from "react-hook-form";
import BaseButton from "../../../components/common/base-button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Input } from "@heroui/react";
import { useLogin } from "../../../services/auth";
import Cookies from "js-cookie";
import { useAuth } from "../../../contexts/AuthContext";

export default function Login() {
  const { control, handleSubmit } = useForm();
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync, isPending: loginLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (values: FieldValues) => {
    const obj = {
      email: values.identity,
      password: values.password,
    };
    const data = await mutateAsync(obj);
    if (data) {
      Cookies.set("access-token", data?.data.data.tokens.access_token, {});
      Cookies.set("refresh-token", data?.data.data.tokens.refresh_token, {});
      setIsAuthenticated(true);
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-darkGray via-base-black to-base-lighterDarkGray flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-base-orange rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">M</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Mindset Dashboard</h1>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-base-gray">
              Sign in to continue to your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-gray" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-base-gray"
                  {...control.register("identity", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-gray" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-base-gray"
                  {...control.register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-gray hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <BaseButton
              type="submit"
              className="w-full bg-base-orange hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              disabled={loginLoading}
              loading={loginLoading}
            >
              {loginLoading ? "Signing in..." : "Sign In"}
            </BaseButton>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/forgot-password"
              className="text-base-orange hover:text-orange-400 text-sm transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
