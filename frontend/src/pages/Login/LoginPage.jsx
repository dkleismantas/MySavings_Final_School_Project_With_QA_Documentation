import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      {" "}
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
              <LoginForm updateFormValue={setIsLogin} />
            </>
          ) : (
            <>
              <SignUpForm />
            </>
          )}
        </fieldset>
      </div>
    </>
  );
}

export default LoginPage;
