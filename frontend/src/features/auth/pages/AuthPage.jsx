import { useState } from "react";
import AuthInfoPanel from "../components/AuthInfoPanel";
import SignInForm from "../components/SignInForm";
import SignupForm from "../components/SignupForm";
import Logo from "../../../components/ui/Logo";

function AuthPage() {
  const activeBtn = "bg-[#F5A623] text-black text-sm font-semibold px-6 py-1.5 rounded-4xl"
  const inactiveBtn = "text-[#e8dbc396] text-sm font-semibold px-6 py-1.5 rounded-4xl"
  const [activeButton, setActiveButton] = useState("signin") 
  const handleActiveBtn = (btn)=>{
    setActiveButton(btn)
  }
  return (
    <div className="bg-[#0E0500] text-white  relative">
      <nav className=" h-20 flex shrink-0 justify-between items-center px-11 border-b  border-[#352101] backdrop-blur-xl sticky top-0 z-50">
        <Logo/>
        <div className="bg-[#2C1E0D] border border-[#5a4626] p-1 rounded-4xl">
            <button className={(activeButton === "signin") ? activeBtn : inactiveBtn} onClick={()=>handleActiveBtn("signin")}>Sign In</button>
            <button className={(activeButton === "signup") ? activeBtn : inactiveBtn} onClick={()=>handleActiveBtn("signup")}>Sign Up</button>
        </div>
      </nav>
      <main className="flex h-screen overflow-hidden">
        <AuthInfoPanel />
        {(activeButton === "signin") ? <SignInForm /> : <SignupForm />}
      </main>
    </div>
  );
}

export default AuthPage;
