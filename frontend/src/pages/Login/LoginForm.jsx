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
        setApiError(
          "Failed to log in. Please check your email and password.",
        );
      } else {
        setApiError("An error occurred on the server. Please try again.");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(loginHandler)} noValidate>
        <label className="label pt-5">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          id="email"
          {...register("email", {
            required: "Please enter your email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email format",
            },
          })}
        />
        <p className="text-orange-600">{errors.email?.message}</p>

        <label className="label pt-5">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          id="password"
          {...register("password", {
            required: "Please enter your password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        <p className="text-orange-600">{errors.password?.message}</p>
        <button type="submit" className="btn btn-neutral mt-4 w-full">
          Log In
        </button>
        {!!apiError && <p className="text-orange-600 pt-5">{apiError}</p>}
      </form>
      <p className="text-center pt-5">
        Don't have an account?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            updateFormValue(false);
          }}
          className="link link-primary"
        >
          Sign Up
        </a>
      </p>
    </>
  );
}

export default LoginForm;
