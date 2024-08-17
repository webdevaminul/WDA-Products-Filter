import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { authContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function GoogleLogin() {
  const { googleLogin } = useContext(authContext);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log("Login with Google", result.user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="p-2 mt-1 bg-slate-100 hover:bg-slate-200 border border-slate-100 rounded flex items-center justify-center gap-2"
    >
      <span className="text-2xl">
        <FcGoogle />
      </span>
      <span>Continue with Google</span>
    </button>
  );
}
