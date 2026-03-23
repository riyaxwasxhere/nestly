import React from "react";
import { FaArrowRight, FaEnvelope, FaGoogle, FaMobile, FaRegEye } from "react-icons/fa";

function SignupForm() {
  return (
    <div>
      <div>
        <h1>
          Join <span>Nestly</span>
        </h1>
        <p>Create your free account and find your perfect room</p>
      </div>
      <button>
        <span>
          <FaGoogle />
        </span>
        <span>Google</span>
      </button>
      <div className="flex items-center text-gray-400 text-xs">
        <div className="flex-1 h-px bg-gray-700"></div>
        <span className="px-3 whitespace-nowrap">or sign up with email</span>
        <div className="flex-1 h-px bg-gray-700"></div>
      </div>

      <div>
        <div>
          <p>I am a</p>
          <div>
            <button>
              <span>🎓</span>
              <span>Student</span>
            </button>
            <button>
              <span>🏠</span>
              <span>Property Owner</span>
            </button>
          </div>
        </div>
        <div>
          <div>
            <p>first name</p>
            <input type="text" placeholder="Aarav" />
          </div>
          <div>
            <p>last name</p>
            <input type="text" placeholder="Sharma" />
          </div>
        </div>
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
          <p>phone number</p>
          <div>
            <input type="text" placeholder="+91 57824 69589" />
            <span>
              <FaMobile />
            </span>
          </div>
        </div>
        <div>
          <p>Password</p>
          <div>
            <input type="password" placeholder="Min. 8 characters" />
            <span>
              <FaRegEye />
            </span>
          </div>
        </div>
        <p>
          <span>
            <input type="checkbox" name="t&c" id="t&c" />
          </span>
          I agree to the Terms & Conditions and Privacy Policy of Nestly
        </p>
        <button>
          Create My Account{" "}
          <span>
            <FaArrowRight />
          </span>
        </button>
        <p>
          Already have an account? <span>Sign in</span>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
