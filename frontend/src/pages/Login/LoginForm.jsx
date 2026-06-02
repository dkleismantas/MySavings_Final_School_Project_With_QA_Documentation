import { useForm } from "react-hook-form";

function LoginForm({ updateFormValue }) {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginHandler = async () => {
  };

  return (
    <>
      <form onSubmit={handleSubmit(loginHandler)} noValidate>
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
          placeholder="Slaptažodis"
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
        <button type="submit" className="btn btn-neutral mt-4 w-full">
          Prisijungti
        </button>
      </form>
      <p className="text-center pt-5">
        Neesate prisiregistravę?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            updateFormValue(false);
          }}
          className="link link-primary"
        >
          Registruokitės
        </a>
      </p>
    </>
  );
}

export default LoginForm;
