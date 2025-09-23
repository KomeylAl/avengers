"use client";

import Image from "next/image";
import loginIcon from "../../../../public/icons/login.svg";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRegister } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/core/validations";
import { useEffect, useState, useRef } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type RegisterInput = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export default function RegisterForm() {
  const { mutate: registerUser } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: yupResolver(registerSchema),
  });

  const username = watch("username");

  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  // 🔹 چک کردن username در سرور با debounce
  useEffect(() => {
    if (!username) {
      setAvailable(null);
      return;
    }

    const id = setTimeout(() => {
      setChecking(true);
      controllerRef.current?.abort();
      const ctrl = new AbortController();
      controllerRef.current = ctrl;

      fetch(`/api/username/check?username=${encodeURIComponent(username)}`, {
        signal: ctrl.signal,
      })
        .then((res) => res.json())
        .then((data: { available: boolean }) => setAvailable(data.available))
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error(err);
            setAvailable(null);
          }
        })
        .finally(() => setChecking(false));
    }, 600);

    return () => clearTimeout(id);
  }, [username]);

  const onSubmit = (data: RegisterInput) => {
    if (available === false) {
      toast.error("This username is already taken");
      return;
    }
    registerUser(data);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center pb-10 pt-30">
      <div className="w-full lg:w-2/5 rounded-lg border border-cyan p-6 flex flex-col items-center gap-6">
        <Image src={loginIcon} alt="" width={70} height={70} />
        <p className="font-bold text-xl text-nicewhite">Register</p>

        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full border border-cyan py-3 px-5 rounded text-nicewhite"
          />
          {errors.name && <p className="text-red-400">{errors.name.message}</p>}

          {/* Email */}
          <input
            {...register("email")}
            type="email"
            placeholder="E-mail"
            className="w-full border border-cyan py-3 px-5 rounded text-nicewhite"
          />
          {errors.email && (
            <p className="text-red-400">{errors.email.message}</p>
          )}

          {/* Password */}
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

          {/* Username */}
          <input
            {...register("username")}
            placeholder="Username"
            className={`w-full border py-3 px-5 rounded text-nicewhite ${
              checking
                ? "border-yellow-400"
                : available === true
                ? "border-green-500"
                : available === false
                ? "border-red-500"
                : "border-cyan"
            }`}
          />
          {errors.username && (
            <p className="text-red-400">{errors.username.message}</p>
          )}
          {checking && (
            <p className="text-yellow-300 text-sm">Checking availability…</p>
          )}
          {available === false && (
            <p className="text-red-400 text-sm">
              This username has already been taken
            </p>
          )}
          {available === true && (
            <p className="text-green-400 text-sm">This username is available</p>
          )}

          {/* Rules */}
          <p className="text-nicewhite">Username rules:</p>
          <ul className="list-disc pl-4 text-nicewhite mt-2 space-y-1">
            <li>
              Only letters (a–z, A–Z), numbers, dots (.) and underscores (_) are
              allowed
            </li>
            <li>Cannot start with a dot (.) or underscore (_)</li>
            <li>Cannot contain consecutive dots (..) or underscores (__)</li>
            <li>Must be between 3 and 30 characters long</li>
          </ul>

          {/* Submit */}
          <button
            disabled={isSubmitting || checking || available === false}
            className="w-full p-3 mt-4 bg-golden text-center rounded font-bold disabled:bg-golden/50 disabled:cursor-not-allowed hover:bg-golden/85"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          <p className="text-nicewhite text-center">
            Have an account?{" "}
            <Link href="/auth/login" className="text-golden">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
