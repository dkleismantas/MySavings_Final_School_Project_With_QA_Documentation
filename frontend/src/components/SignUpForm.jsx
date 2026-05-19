import { useState } from "react";

function SignUpForm() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="h-screen flex">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 m-auto">
        <div className="tabs tabs-box">
          <input
            type="radio"
            name="my_tabs_1"
            className="tab flex-1 "
            aria-label="Prisijungti"
            checked={isLogin}
            onChange={() => setIsLogin(true)}
          />
          <input
            type="radio"
            name="my_tabs_1"
            className="tab flex-1"
            aria-label="Registruotis"
            checked={!isLogin}
            onChange={() => setIsLogin(false)}
          />
        </div>
        {isLogin ? (
          <>
            <form action="">
              <label className="label pt-5">El. paštas</label>
              <input type="email" className="input" placeholder="El. paštas" />

              <label className="label pt-5">Slaptažodis</label>
              <input type="password" className="input" placeholder="Slaptažodis" />
            </form>
            <button className="btn btn-neutral mt-4">Prisijungti</button>
            <p className="text-center pt-5">
              Neesate prisiregistravę?{" "}
              <a href="#"  onClick={(e) => {
                e.preventDefault();
                setIsLogin(false);
              }} className="link link-primary">
                Registruokitės
              </a>
            </p>
          </>
        ) : (
          <>
            <form action="">
              <label className="label pt-5">Vartotojo vardas</label>
              <input type="text" className="input" placeholder="Vartotojo vardas" />

              <label className="label pt-5">El. paštas</label>
              <input type="email" className="input" placeholder="El. paštas" />

              <label className="label pt-5">Slaptažodis</label>
              <input type="password" className="input" placeholder="Įveskite slaptažodį" />
              <input type="password" className="input" placeholder="Pakartokite slaptažodį" />
            </form>
            <button className="btn btn-neutral mt-4">Registruotis</button>
          </>
        )}
      </fieldset>
    </div>
  );
}

export default SignUpForm;
