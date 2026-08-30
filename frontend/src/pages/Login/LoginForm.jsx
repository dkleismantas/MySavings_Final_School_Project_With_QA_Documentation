import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { loginUser } from "../../services/User";

function LoginForm({ updateFormValue }) {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (formData) => {
    try {
      const response = await loginUser(formData);
      const { accessToken } = response.data;

      if (accessToken) {
        login(accessToken);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setApiError("Failed to log in. Please check your email and password.");
      } else {
        setApiError("An error occurred on the server. Please try again.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(loginHandler)} noValidate className="space-y-5">
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
            {...register("email", { required: "Please enter your email" })}
          />
          {errors.email && (
            <p className="text-xs text-[#FF5722] font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </label>
          </div>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl bg-[#201a18] border border-zinc-800 text-white focus:outline-none focus:border-[#FF5722] transition-colors placeholder-zinc-600"
            {...register("password", { required: "Please enter your password" })}
          />
          {errors.password && (
            <p className="text-xs text-[#FF5722] font-medium">{errors.password.message}</p>
          )}
        </div>

        {/* Server API Errors */}
        {apiError && (
          <p className="text-sm text-[#FF5722] bg-[#2a1410] p-3 rounded-lg border border-[#FF5722]/20">
            {apiError}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-2 rounded-xl bg-[#FF5722] hover:bg-[#e44d1e] text-white font-semibold transition-colors shadow-lg shadow-[#FF5722]/10 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/50"
        >
          Sign in
        </button>
      </form>

      {/* Auth Toggle Link */}
      <p className="text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => updateFormValue(false)}
          className="text-white underline underline-offset-4 hover:text-[#FF5722] transition-colors font-medium ml-1"
        >
          Create one
        </button>
      </p>
    </div>
  );
}

export default LoginForm;