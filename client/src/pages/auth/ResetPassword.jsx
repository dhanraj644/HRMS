import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Lock,
  Eye,
  EyeOff,
  Building2,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      console.log(data);

      // await resetPassword(data)

      toast.success("Password Reset Successfully");

      navigate("/login");
    } catch (error) {
      toast.error("Unable to reset password");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">

      {/* LEFT */}

      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-12">

        <div className="bg-white p-5 rounded-full mb-8">
          <Building2 size={60} className="text-blue-700" />
        </div>

        <h1 className="text-5xl font-bold mb-5">
          HRMS
        </h1>

        <p className="text-lg text-center max-w-md opacity-90">
          Create a strong password to keep your account secure.
        </p>

      </div>

      {/* RIGHT */}

      <div className="flex justify-center items-center p-6">

        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

          <h2 className="text-3xl font-bold text-center">
            Reset Password
          </h2>

          <p className="text-gray-500 text-center mt-2 mb-8">
            Enter your new password
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* PASSWORD */}

            <div>

              <Label>New Password</Label>

              <div className="relative mt-2">

                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="pl-10 pr-10 h-11"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>

            </div>

            {/* CONFIRM PASSWORD */}

            <div>

              <Label>Confirm Password</Label>

              <div className="relative mt-2">

                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />

                <Input
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  placeholder="Confirm password"
                  className="pl-10 pr-10 h-11"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password ||
                      "Passwords do not match",
                  })}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-3"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword?.message}
              </p>

            </div>

            <Button
              className="w-full h-11"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Updating..."
                : "Reset Password"}
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

export default ResetPassword;