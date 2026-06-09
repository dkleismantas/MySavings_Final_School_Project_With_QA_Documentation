import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/User";

function SignUpForm() {
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
        return;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setApiError(error.response.data);
      } else {
        setApiError("An error occurred on the server. Please try again.");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(registerHandler)} noValidate>
        <label className="label pt-5">User name</label>
        <input
          type="text"
          className="input"
          placeholder="User name"
          id="username"
          {...register("username", {
            required: "Please enter a user name",
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
              message:
                "Username must start with a letter and can only contain letters, numbers, dots, hyphens, or underscores",
            },
          })}
        />
        <p className="text-orange-600">{errors.username?.message}</p>

        <label className="label pt-5">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          id="email"
          {...register("email", {
            required: "Please enter an email address",
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
          placeholder="Enter password"
          id="password"
          {...register("password", {
            required: "Please enter a password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        <p className="text-orange-600">{errors.password?.message}</p>

        <input
          type="password"
          className="input"
          placeholder="Enter password again"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === passwordValue || "Passwords do not match",
          })}
        />
        <p className="text-orange-600">{errors.confirmPassword?.message}</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-neutral mt-4 w-full"
        >
          {isSubmitting ? "Creating user..." : "Create User"}
        </button>
        {!!apiError && <p className="text-orange-600 pt-5">{apiError}</p>}
        {!!successMessage && (
          <p className="text-green-600 text-center pt-5">{successMessage}</p>
        )}
      </form>
    </>
  );
}

export default SignUpForm;
