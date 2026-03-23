import React from "react";
import { FaArrowRight, FaEnvelope, FaGoogle, FaRegEye } from "react-icons/fa";

function SignInForm() {
  return (
    <div>
      <div>
        <h1>
          Welcome <span>Back!</span>
        </h1>
        <p>Sign in to find your perfect stay near campus</p>
      </div>
      <button>
        <span>
          <FaGoogle />
        </span>
        <span>Google</span>
      </button>
      <div className="flex items-center text-gray-400 text-xs">
        <div className="flex-1 h-px bg-gray-700"></div>
        <span className="px-3 whitespace-nowrap">or continue with email</span>
        <div className="flex-1 h-px bg-gray-700"></div>
      </div>
      <div>
        <div>
          <p>Email address</p>
          <div>
            <input type="email" placeholder="you@college.edu" />
            <span>
              <FaEnvelope />
            </span>
          </div>
        </div>
        <div>
          <p>Password</p>
          <div>
            <input type="email" placeholder="Enter your password" />
            <span>
              <FaRegEye />
            </span>
          </div>
        </div>
        <span>Forgot Password?</span>
        <button>
          Sign In to Nestly{" "}
          <span>
            <FaArrowRight />
          </span>
        </button>
        <p>
          New to Nestly? <span>Create an account</span>
        </p>
      </div>
    </div>
  );
}

export default SignInForm;
