import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/User";

function SignUpForm({ updateFormValue }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const registerHandler = async (formData) => {
    setSuccessMessage("");
    setApiError("");

    try {
      const response = await registerUser(formData);
      if (response.status === 201) {
        setSuccessMessage("User created successfully! You can now log in.");
        reset();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setApiError(error.response.data || "Invalid registration data provided.");
      } else {
        setApiError("An error occurred on the server. Please try again.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(registerHandler)} noValidate className="space-y-5">
        
        {/* Username Field */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="username" className="text-sm font-medium text-gray-300">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="johndoe"
            className="w-full px-4 py-3 rounded-xl bg-[#201a18] border border-zinc-800 text-white focus:outline-none focus:border-[#FF5722] transition-colors placeholder-zinc-600"
            {...register("username", {
              required: "Please enter a username",
              minLength: {
                value: 3,
                message: "Please enter a username with at least 3 characters",
              },
              maxLength: {
                value: 30,
                message: "Please enter a username with no more than 30 characters",
              },
              pattern: {
                value: /^[a-zA-Z][a-zA-Z0-9._-]*$/,
                message: "Must start with a letter and only contain alphanumeric characters, dots, hyphens, or underscores",
              },
            })}
          />
          {errors.username && (
            <p className="text-xs text-[#FF5722] font-medium">{errors.username.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            Email address
          </label>
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            className="w-full px-4 py-3 rounded-xl bg-[#201a18] border border-zinc-800 text-white focus:outline-none focus:border-[#FF5722] transition-colors placeholder-zinc-600"
            {...register("email", {
              required: "Please enter an email address",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-[#FF5722] font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl bg-[#201a18] border border-zinc-800 text-white focus:outline-none focus:border-[#FF5722] transition-colors placeholder-zinc-600"
            {...register("password", {
              required: "Please enter a password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="text-xs text-[#FF5722] font-medium">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl bg-[#201a18] border border-zinc-800 text-white focus:outline-none focus:border-[#FF5722] transition-colors placeholder-zinc-600"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === passwordValue || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-[#FF5722] font-medium">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Server Response Errors */}
        {apiError && (
          <p className="text-sm text-[#FF5722] bg-[#2a1410] p-3 rounded-lg border border-[#FF5722]/20">
            {apiError}
          </p>
        )}

        {/* Server Success Messages */}
        {successMessage && (
          <p className="text-sm text-emerald-400 bg-[#12261e] p-3 rounded-lg border border-emerald-500/20 text-center font-medium">
            {successMessage}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 mt-2 rounded-xl bg-[#FF5722] hover:bg-[#e44d1e] disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-semibold transition-colors shadow-lg shadow-[#FF5722]/10 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/50"
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {/* Auth Toggle Link */}
      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => updateFormValue(true)}
          className="text-white underline underline-offset-4 hover:text-[#FF5722] transition-colors font-medium ml-1"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}

export default SignUpForm;