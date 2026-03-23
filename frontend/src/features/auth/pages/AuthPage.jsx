import { useState } from "react";
import AuthInfoPanel from "../components/AuthInfoPanel";
import SignInForm from "../components/SignInForm";
import SignupForm from "../components/SignupForm";
import logo from "../../../assets/images/logo.jpg";

function AuthPage() {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className="bg-[#0E0500] text-white">
      <nav>
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 bg-center rounded-full bg-size-[180%]"
            style={{ backgroundImage: `url(${logo})` }}
          ></div>
          <h3 className="text-amber-500 font-extrabold text-2xl">Nestly</h3>
        </div>
        <div>
            <button>Sign In</button>
            <button>Sign Up</button>
        </div>
      </nav>
      <div>
        <AuthInfoPanel />
        {signIn ? <SignInForm /> : <SignupForm />}
      </div>
    </div>
  );
}

export default AuthPage;
