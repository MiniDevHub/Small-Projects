import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormField from "@/components/common/FormField";
import { useAuth } from "@/hooks/useAuth";
import useAuthStore from "@/store/authStore";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

const registerSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  first_name: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  last_name: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { register: registerUser, isRegistering } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-primary-600 rounded-xl">
            <Bike className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Register as a customer to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                label="First Name"
                type="text"
                placeholder="John"
                error={errors.first_name?.message}
                {...register("first_name")}
                required
              />

              <FormField
                label="Last Name"
                type="text"
                placeholder="Doe"
                error={errors.last_name?.message}
                {...register("last_name")}
                required
              />
            </div>

            <FormField
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
              required
            />

            <FormField
              label="Phone"
              type="tel"
              placeholder="9876543210"
              error={errors.phone?.message}
              {...register("phone")}
              helperText="10 digit mobile number"
              required
            />

            <div className="space-y-2">
              <FormField
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password")}
                helperText="Must be 8+ characters with uppercase, lowercase, and number"
                required
              />
            </div>

            <FormField
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              error={errors.confirm_password?.message}
              {...register("confirm_password")}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
            >
              {showPassword ? (
                <>
                  <EyeOff className="w-4 h-4" /> Hide passwords
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" /> Show passwords
                </>
              )}
            </button>

            <Button type="submit" className="w-full" disabled={isRegistering}>
              {isRegistering ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              Login here
            </Link>
          </div>

          <div className="text-xs text-center text-gray-500">
            <Link to="/" className="hover:text-primary-600">
              Back to home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
