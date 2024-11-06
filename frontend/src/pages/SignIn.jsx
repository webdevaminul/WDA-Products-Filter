import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authContext } from "../providers/AuthProvider";
import GoogleLogin from "../components/GoogleLogin";

export default function SignIn() {
  const [error, setError] = useState(null);
  const { logIn } = useContext(authContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setError(null);
    console.log(formData);
    logIn(formData.userEmail, formData.userPassword)
      .then((result) => {
        console.log("Login Successful", result.user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-[90vh] max-w-xs container mx-auto flex items-center justify-center">
      <div className="flex flex-col gap-4 justify-center p-4 w-full ">
        {/* Switch between signup and signin */}
        <div>
          <p className="text-2xl sm:text-3xl">Sign in</p>
          <p className="text-sm">
            <span>or </span>
            <span>
              <Link to="/signup" className="text-blue-500 hover:underline">
                create a new account
              </Link>
            </span>
          </p>
        </div>

        {/* Sign up form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Email address input */}
          <input
            type="email"
            placeholder="Email address"
            className={`p-2 mt-4 bg-transparent border rounded outline-none ${
              errors.userEmail ? "border-red-400" : "border-slate-200"
            }`}
            {...register("userEmail", {
              required: "Email address is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            aria-invalid={errors.userEmail ? "true" : "false"}
          />
          {errors.userEmail && (
            <p role="alert" className="text-red-400">
              {errors.userEmail.message}
            </p>
          )}

          {/* Create password input */}
          <input
            type="password"
            placeholder="Password*"
            className={`p-2 mt-4 bg-transparent border rounded outline-none ${
              errors.userPassword ? "border-red-400" : "border-slate-200"
            }`}
            {...register("userPassword", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                message: "Password must contain at least one letter and one number",
              },
            })}
            aria-invalid={errors.userPassword ? "true" : "false"}
          />
          {errors.userPassword && (
            <p role="alert" className="text-red-400">
              {errors.userPassword.message}
            </p>
          )}

          {/* Sign up button */}
          <button
            type="submit"
            className="p-2 mt-4 bg-slate-500 hover:bg-slate-600 border-none rounded text-white"
          >
            Sign in
          </button>
        </form>

        {/* Error message */}
        {error && <p className="text-red-400">{error}</p>}

        {/* Google button */}
        <GoogleLogin />
      </div>
    </div>
  );
}
