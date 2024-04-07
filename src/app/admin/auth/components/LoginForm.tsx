"use client";
import Input from "@/components/common/Input";
import { message } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface IData {
  email: string;
  password: string;
  remember: boolean;
}
const LoginForm = () => {
  const { control, handleSubmit, formState, register } = useForm<IData>({});
  const router = useRouter();
  const onLogin = async (data: IData) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        message.error(res.error || "Login error! Check your email/ password!");
      } else {
        router.push("/admin");
      }
    } catch (error) {
      console.error(error);
      message.error("Login error! Check your email/ password!");
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onLogin)}>
      <Input
        label="Email"
        name="email"
        placeholder="Enter your email"
        control={control}
        rules={{
          required: true,
          pattern: /^\S+@\S+\.\S+$/,
        }}
      />
      <Input
        label="Password"
        name="password"
        placeholder="••••••••"
        control={control}
        rules={{
          required: true,
        }}
        type="password"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              {...register("remember")}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="remember"
              className="text-gray-500 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
        </div>
        <a
          href="#"
          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Forgot password?
        </a>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Sign in
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <a
          href="#"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign up
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
