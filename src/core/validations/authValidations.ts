import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Name is requierd."),
  email: yup.string().required("Email is requierd."),
  username: yup.string().required("Username is requierd."),
  password: yup.string().required("Password is requierd."),
});

export const loginSchema = yup.object({
  emailOrUsername: yup.string().required("Email or username is required."),
  password: yup.string().required("Password is requierd."),
});
