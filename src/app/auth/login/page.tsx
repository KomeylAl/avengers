"use client";

import React, { useState } from "react";
import loginIcon from "../../../../public/icons/login.svg";
import Image from "next/image";
import { redirect } from "next/navigation";
import GoogleButton from "@/components/layout/GoogleButton";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/core/validations/authValidations";
import { useLogin } from "@/hooks/useAuth";
import { FiEye, FiEyeOff } from "react-icons/fi";

type LoginInput = {
  emailOrUsername: string;
  password: string;
};

const AuthPage = () => {
  const { mutate: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full lg:w-4/6 xl:w-1/3 rounded-lg border border-cyan p-6 flex flex-col items-center gap-6">
        <Image src={loginIcon} alt="" width={70} height={70} />
        <p className="font-bold text-3xl text-nicewhite">Sign In</p>
        <div className="w-full flex flex-col items-center gap-3">
          <form
            onSubmit={handleSubmit((data, event) => {
              event?.preventDefault();
              login(data);
            })}
            className="w-full flex flex-col items-center gap-4"
          >
            <input
              {...register("emailOrUsername")}
              type="test"
              className="w-full border border-cyan focus:border-golden py-3 px-5 focus:ring-golden focus:outline-golden text-nicewhite rounded"
              placeholder="E-mail or username"
            />
            {errors.emailOrUsername && (
              <p className="text-red-400 mt-1 text-sm">
                {String(errors.emailOrUsername.message)}
              </p>
            )}
            <div className="relative w-full">
              {/* Password Input */}
              <input
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-cyan py-3 px-5 rounded text-nicewhite pr-12"
              />

              {/* Toggle Icon */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>

              {/* Error Message */}
              {errors.password && (
                <p className="text-red-400 mt-1 text-sm">
                  {String(errors.password.message)}
                </p>
              )}
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-golden">Remember me</p>
              <input
                type="checkbox"
                className="h-4 w-4 appearance-none rounded bg-gray-300 checked:bg-golden checked:after:block checked:after:text-white checked:after:text-center"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full p-3 text-center bg-golden rounded font-bold cursor-pointer hover:bg-golden/85 transition-colors duration-300 ease-in-out disabled:bg-golden/75 disabled:cursor-not-allowed"
            >
              Sign In
            </button>
          </form>
          <p className="text-nicewhite">or</p>
          {/* <GoogleButton /> */}
          <p className="text-nicewhite">
            Don't have any account?{" "}
            <Link href="/auth/register" className="text-golden">
              Register now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
