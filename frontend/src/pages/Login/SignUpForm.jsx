import { useForm } from "react-hook-form";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

function SignUpForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const passwordValue = watch("password");
  const registerHandler = async (formData) => {
    await axios.post(`${API_URL}/api/User/create-user`, formData);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(registerHandler)} noValidate>
        <label className="label pt-5">Vartotojo vardas</label>
        <input
          type="text"
          className="input"
          placeholder="Vartotojo vardas"
          id="username"
          {...register("username", {
            required: "Įveskite vartotojo vardą",
            minLength: {
              value: 3,
              message: "Ne mažiau kaip 3 simboliai",
            },
          })}
        />
        <p className="text-orange-600">{errors.username?.message}</p>

        <label className="label pt-5">El. paštas</label>
        <input
          type="email"
          className="input"
          placeholder="El. paštas"
          id="email"
          {...register("email", {
            required: "Įveskite el. paštą",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Neteisingas el. pašto formatas",
            },
          })}
        />
        <p className="text-orange-600">{errors.email?.message}</p>

        <label className="label pt-5">Slaptažodis</label>
        <input
          type="password"
          className="input"
          placeholder="Įveskite slaptažodį"
          id="password"
          {...register("password", {
            required: "Įveskite slaptažodį",
            minLength: {
              value: 6,
              message: "Ne mažiau kaip 6 simboliai",
            },
          })}
        />
        <p className="text-orange-600">{errors.password?.message}</p>

        <input
          type="password"
          className="input"
          placeholder="Pakartokite slaptažodį"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Pakartokite slaptažodį",
            validate: (value) =>
              value === passwordValue || "Slaptažodžiai nesutampa",
          })}
        />
        <p className="text-orange-600">{errors.confirmPassword?.message}</p>
        <button type="submit" className="btn btn-neutral mt-4 w-full">
          Registruotis
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
