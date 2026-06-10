import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import mainIcon from "../../assets/main-icon.svg";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  // LoginPage.jsx - Wrap layout columns with a max-width wrapper
return (
  <div className="min-h-screen bg-[#101010] text-white flex items-center justify-center">
    {/* Max width container prevents infinite stretching on 4K / Ultra-wide displays */}
    <div className="w-full max-w-[1600px] mx-auto flex p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
      
      {/* LEFT SIDE: Quote Card */}
      <div className="hidden lg:flex lg:w-1/2 p-8 items-center justify-center">
        {/* Added 2xl: text size scaling for massive screens */}
        <div className="w-full max-w-xl aspect-[4/5] bg-gradient-to-br from-[#FF5722] to-[#d83f0e] rounded-[32px] p-12 xl:p-16 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />
          
          <h1 className="text-4xl font-bold leading-tight md:text-5xl 2xl:text-6xl mt-12">
            "The goal isn't to be rich. It's to have enough."
          </h1>
          <p className="text-lg 2xl:text-xl opacity-80 font-medium">— Morgan Housel</p>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-20 xl:px-28">
        {/* Added max-w-lg to keep form structurally sound on large resolution grids */}
        <div className="w-full max-w-md 2xl:max-w-lg space-y-8 2xl:space-y-12">
          
          {/* Logo Headers */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={mainIcon} alt="Savings Tracker Logo" className="w-8 h-8 2xl:w-10 2xl:h-10 object-contain" />
              <span className="text-xl 2xl:text-2xl font-semibold tracking-wide">Savings Tracker</span>
            </div>
            
            <div>
              <h2 className="text-3xl 2xl:text-4xl font-bold tracking-tight">
                {isLogin ? "Welcome back" : "Create your account"}
              </h2>
              <p className="text-gray-400 mt-2 2xl:text-lg">
                {isLogin ? "Sign in to your account" : "Start tracking your savings goals"}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="mt-8">
            {isLogin ? (
              <LoginForm updateFormValue={setIsLogin} />
            ) : (
              <SignUpForm updateFormValue={setIsLogin} /> 
            )}
          </div>

        </div>
      </div>

    </div>
  </div>
);
}

export default LoginPage;