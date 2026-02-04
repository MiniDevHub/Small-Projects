import React, { useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Bike,
  Shield,
  Truck,
  Headphones,
  TrendingUp,
  Users,
  Store,
  ChevronRight,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import useAuthStore from "@/store/authStore";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import MinimalHeader from "@/components/layout/MinimalHeader";

const customerSchema = yup.object({
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
  const [searchParams] = useSearchParams();
  const registrationType = searchParams.get("type") || "customer";

  const [showPassword, setShowPassword] = useState(false);
  const [selectedType, setSelectedType] = useState(registrationType);
  const [currentStep, setCurrentStep] = useState(1);

  const { isAuthenticated } = useAuthStore();
  const { register: registerUser, isRegistering } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(customerSchema),
    mode: "onChange",
  });

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = (data) => {
    registerUser(data);
  };

  // Registration types
  const registrationTypes = [
    {
      type: "customer",
      title: "Customer Account",
      subtitle: "Buy bikes & book services",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      benefits: [
        "Exclusive member pricing",
        "Free home delivery",
        "Priority service booking",
        "Extended warranty options",
      ],
    },
    {
      type: "dealer",
      title: "Dealership Partner",
      subtitle: "Join our dealer network",
      icon: Store,
      color: "from-purple-500 to-pink-500",
      benefits: [
        "Exclusive territory rights",
        "Marketing support",
        "Best profit margins",
        "Training & certification",
      ],
    },
  ];

  // Form steps (for customer)
  const formSteps = [
    { step: 1, title: "Personal Details", fields: ["first_name", "last_name"] },
    { step: 2, title: "Contact Info", fields: ["email", "phone"] },
    {
      step: 3,
      title: "Set Password",
      fields: ["password", "confirm_password"],
    },
  ];

  const isStepValid = (step) => {
    if (step === 1) {
      return !errors.first_name && !errors.last_name;
    }
    if (step === 2) {
      return !errors.email && !errors.phone;
    }
    if (step === 3) {
      return !errors.password && !errors.confirm_password;
    }
    return false;
  };

  return (
    <>
      <MinimalHeader />
      <div className="flex min-h-screen pt-20">
        {/* Left Side - Hero Section */}
        <div className="relative items-center justify-center hidden w-1/2 overflow-hidden lg:flex xl:w-2/5">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e4488] via-[#201b51] to-[#00AFAA]">
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-lg px-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Dynamic content based on selected type */}
              <AnimatePresence mode="wait">
                {selectedType === "customer" ? (
                  <motion.div
                    key="customer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <h2 className="mb-6 text-5xl font-bold leading-tight">
                      Join The
                      <br />
                      <span className="text-[#00AFAA]">E-Mobility</span>
                      <br />
                      Revolution
                    </h2>
                    <p className="mb-12 text-xl leading-relaxed text-white/90">
                      Experience the future of transportation with India's most
                      trusted electric bike brand.
                    </p>

                    {/* Customer Benefits */}
                    <div className="space-y-4">
                      {[
                        "Exclusive member-only pricing",
                        "Free doorstep delivery",
                        "4 free services included",
                        "24/7 customer support",
                      ].map((benefit, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-[#00AFAA]" />
                          <span>{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="dealer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <h2 className="mb-6 text-5xl font-bold leading-tight">
                      Partner With
                      <br />
                      <span className="text-[#00AFAA]">India's #1</span>
                      <br />
                      EV Brand
                    </h2>
                    <p className="mb-12 text-xl leading-relaxed text-white/90">
                      Join 250+ successful dealerships. Transform your business
                      with the electric revolution.
                    </p>

                    {/* Dealer Benefits */}
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { icon: Shield, text: "Protected Territory" },
                        { icon: TrendingUp, text: "40% Profit Margin" },
                        { icon: Truck, text: "Quick Delivery" },
                        { icon: Headphones, text: "24/7 Support" },
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="text-center"
                        >
                          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/20">
                            <item.icon className="w-8 h-8 text-[#00AFAA]" />
                          </div>
                          <p className="text-sm font-medium">{item.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-12 mt-12 border-t border-white/20"
              >
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-3xl font-bold text-[#00AFAA]">15,000+</p>
                    <p className="text-sm text-white/70">Happy Customers</p>
                  </div>
                  <div className="w-px h-12 bg-white/20" />
                  <div>
                    <p className="text-3xl font-bold text-[#00AFAA]">250+</p>
                    <p className="text-sm text-white/70">Dealer Network</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 right-10">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-24 h-24 rounded-full bg-white/10 backdrop-blur"
            />
          </div>
          <div className="absolute bottom-20 left-10">
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-32 h-32 rounded-full bg-[#00AFAA]/20 backdrop-blur"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="relative flex items-center justify-center w-full px-6 py-12 lg:w-1/2 xl:w-3/5 bg-gray-50">
          <div className="w-full max-w-lg">
            {/* Logo & Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
            >
              <Link to="/" className="inline-block mb-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-white rounded-2xl bg-gradient-to-br from-[#1e4488] to-[#00AFAA] shadow-lg">
                    EB
                  </div>
                  <span className="text-3xl font-bold text-gray-900">
                    E-Bike Point
                  </span>
                </div>
              </Link>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                Create Your Account
              </h1>
              <p className="text-gray-600">
                Join India's fastest-growing EV network
              </p>
            </motion.div>

            {/* Account Type Selection */}
            {!currentStep && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {registrationTypes.map((type, index) => (
                  <motion.button
                    key={type.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      setSelectedType(type.type);
                      setCurrentStep(1);
                    }}
                    className={`relative w-full p-6 text-left bg-white border-2 rounded-2xl transition-all hover:shadow-lg group ${
                      selectedType === type.type
                        ? "border-[#1e4488] shadow-md"
                        : "border-gray-200 hover:border-[#1e4488]"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="mb-1 text-xl font-bold text-gray-900">
                          {type.title}
                        </h3>
                        <p className="mb-4 text-sm text-gray-600">
                          {type.subtitle}
                        </p>
                        <div className="space-y-2">
                          {type.benefits.slice(0, 2).map((benefit, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-sm text-gray-700"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                      >
                        <type.icon className="w-7 h-7" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Registration Form */}
            {currentStep > 0 && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-2 mb-8">
                  {formSteps.map((step, index) => (
                    <React.Fragment key={step.step}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all ${
                          currentStep >= step.step
                            ? "bg-gradient-to-br from-[#1e4488] to-[#00AFAA] text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step.step}
                      </motion.div>
                      {index < formSteps.length - 1 && (
                        <div
                          className={`h-0.5 w-12 transition-all ${
                            currentStep > step.step
                              ? "bg-gradient-to-r from-[#1e4488] to-[#00AFAA]"
                              : "bg-gray-300"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Step Title */}
                <div className="text-center">
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    {formSteps[currentStep - 1].title}
                  </h2>
                  <p className="text-gray-600">
                    {currentStep === 1 && "Tell us about yourself"}
                    {currentStep === 2 && "How can we reach you?"}
                    {currentStep === 3 && "Secure your account"}
                  </p>
                </div>

                {/* Form Fields */}
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                          id="first_name"
                          placeholder="John"
                          className="mt-1.5 h-12"
                          {...register("first_name")}
                        />
                        {errors.first_name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.first_name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                          id="last_name"
                          placeholder="Doe"
                          className="mt-1.5 h-12"
                          {...register("last_name")}
                        />
                        {errors.last_name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.last_name.message}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className="mt-1.5 h-12"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="9876543210"
                          className="mt-1.5 h-12"
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative mt-1.5">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Min 8 characters"
                            className="h-12 pr-12"
                            {...register("password")}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.password.message}
                          </p>
                        )}
                        <div className="mt-2 space-y-1 text-xs text-gray-600">
                          <p>Password must contain:</p>
                          <ul className="ml-4 space-y-0.5">
                            <li>• At least 8 characters</li>
                            <li>• One uppercase letter</li>
                            <li>• One lowercase letter</li>
                            <li>• One number</li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="confirm_password">
                          Confirm Password
                        </Label>
                        <Input
                          id="confirm_password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Re-enter password"
                          className="mt-1.5 h-12"
                          {...register("confirm_password")}
                        />
                        {errors.confirm_password && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.confirm_password.message}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex gap-3 pt-6">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="h-12"
                    >
                      Previous
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={async () => {
                        // Trigger validation for current step fields
                        const fieldsToValidate =
                          formSteps[currentStep - 1].fields;
                        const isValid = await trigger(fieldsToValidate);
                        if (isValid) {
                          setCurrentStep(currentStep + 1);
                        }
                      }}
                      className="flex-1 h-12 font-semibold bg-gradient-to-r from-[#1e4488] to-[#00AFAA] hover:opacity-90"
                    >
                      Continue
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isRegistering || !isStepValid(3)}
                      className="flex-1 h-12 font-semibold bg-gradient-to-r from-[#1e4488] to-[#00AFAA] hover:opacity-90"
                    >
                      {isRegistering ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <CheckCircle className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {/* Terms & Login Link */}
                {currentStep === 3 && (
                  <div className="pt-6 space-y-4 text-center border-t">
                    <p className="text-sm text-gray-600">
                      By registering, you agree to our{" "}
                      <Link
                        to="/terms"
                        className="font-medium text-[#1e4488] hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="font-medium text-[#1e4488] hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </p>
                    <p className="text-gray-600">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="font-semibold text-[#1e4488] hover:text-[#2a5199]"
                      >
                        Login here
                      </Link>
                    </p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
