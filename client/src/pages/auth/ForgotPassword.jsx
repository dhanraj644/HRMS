import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Mail, Building2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);

      // await forgotPassword(data)

      toast.success("Password reset link sent successfully.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">
      {/* LEFT */}

      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-12">
        <div className="bg-white p-5 rounded-full mb-8">
          <Building2 size={60} className="text-blue-700" />
        </div>

        <h1 className="text-5xl font-bold mb-5">HRMS</h1>

        <p className="text-lg text-center max-w-md opacity-90">
          Forgot your password?
          <br />
          <br />
          Enter your registered email address and we'll send you a password
          reset link.
        </p>
      </div>

      {/* RIGHT */}

      <div className="flex justify-center items-center p-6">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-center">
            Forgot Password
          </h2>

          <p className="text-gray-500 text-center mt-2 mb-8">
            Enter your registered email
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <Label>Email</Label>

              <div className="relative mt-2">
                <Mail
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-11"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
            </div>

            <Button
              className="w-full h-11"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Sending..."
                : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            © 2026 HRMS. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;