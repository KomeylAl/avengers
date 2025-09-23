import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      name,
      email,
      username,
      password,
    }: {
      email: string;
      name: string;
      username: string;
      password: string;
    }) => axios.post("/api/auth/register", { name, email, username, password }),
    onSuccess: () => {
      router.push("/auth/verify");
      toast.success("Registerd successfuly");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      emailOrUsername,
      password,
    }: {
      emailOrUsername: string;
      password: string;
    }) => axios.post("/api/auth/login", { emailOrUsername, password }),
    onSuccess: (result) => {
      console.log(result);
      if (!result.data.user.emailVerified) {
        router.push("/auth/verify");
      } else {
        router.push("/profile");
      }
      toast.success("Logined successfuly");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
