import { useState } from "react";
import { Card, CardBody, CardHeader, Input, Button, Divider } from "@heroui/react";
import { Mail, ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useFormSubmit } from "../../../hooks/useFormSubmit";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const { isLoading, error, submit, resetError } = useFormSubmit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      await submit(async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Show OTP modal after successful submission
        setShowOtpModal(true);
        setOtpSent(true);
      });
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim() || otp.length !== 6) return;

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpVerified(true);
      
      // Auto-close modal after 2 seconds
      setTimeout(() => {
        setShowOtpModal(false);
        setOtp("");
        setOtpSent(false);
        setOtpVerified(false);
        setEmail("");
      }, 2000);
    } catch (error) {
      console.error("Failed to verify OTP:", error);
    }
  };

  const handleResendOtp = async () => {
    try {
      // Simulate resending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtp("");
      setOtpVerified(false);
      // You could show a success message here
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
  };

  const closeModal = () => {
    setShowOtpModal(false);
    setOtp("");
    setOtpSent(false);
    setOtpVerified(false);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
            <p className="text-gray-600 mt-2">
              Enter your email address and we'll send you a verification code to reset your password.
            </p>
          </CardHeader>

          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                startContent={<Mail className="w-4 h-4 text-gray-400" />}
                isRequired
                isDisabled={isLoading}
                errorMessage={error?.message}
                onFocus={resetError}
              />

              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isLoading}
                disabled={!email.trim()}
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

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                {otpVerified ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <Mail className="w-8 h-8 text-blue-600" />
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {otpVerified ? "OTP Verified!" : "Enter Verification Code"}
              </h2>
              <p className="text-gray-600 mt-2">
                {otpVerified 
                  ? "Your password has been reset successfully. You'll be redirected to login."
                  : `We've sent a 6-digit verification code to ${email}`
                }
              </p>
            </CardHeader>

            {!otpVerified && (
              <CardBody>
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <Input
                    type="text"
                    label="Verification Code"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    isRequired
                    className="text-center text-2xl font-mono tracking-widest"
                  />

                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="bordered"
                      className="flex-1"
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      className="flex-1"
                      disabled={otp.length !== 6}
                    >
                      Verify Code
                    </Button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Didn't receive the code?
                  </p>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={handleResendOtp}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Resend Code
                  </Button>
                </div>
              </CardBody>
            )}
          </Card>
        </div>
      )}
    </>
  );
}
