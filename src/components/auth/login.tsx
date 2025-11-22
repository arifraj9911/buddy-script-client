"use client";

import Image from "next/image";
import loginImg from "@/assets/images/login.png";
import logo from "@/assets/images/logo.svg";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface IFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<IFormInput>();

  const fetchLogin = async (email: string, password: string) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });
      console.log("login data", res.data);
      return res.data;
    } catch (error) {
      console.log("failed to login!", error);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    alert("form submitted");
    console.log("form data", data);
    fetchLogin(data.email, data.password);
  };
  return (
    <section className=" bg-gray-100">
      <div className="max-w-7xl mx-auto flex justify-evenly items-center min-h-screen py-20">
        <div className="">
          <Image src={loginImg} alt="login_img" className="w-auto h-auto" />
        </div>

        <div className="bg-white p-8 flex flex-col items-center w-1/3 rounded-md">
          <Image src={logo} alt="logo" className="w-auto h-auto" />
          <div className="mt-8 mb-12 space-y-2 text-center">
            <p className="text-lg">Welcome Back</p>
            <h3 className="text-2xl font-medium">Login to your account</h3>
          </div>
          <button className="border cursor-pointer border-gray-100 rounded-md  py-2 px-8 flex items-center gap-2 font-medium text-lg">
            <FcGoogle size={24} />
            or sign-in with Google
          </button>
          <div className="my-8 flex items-center w-4/5 gap-4">
            <hr className="w-full border border-gray-300"></hr>
            Or
            <hr className="w-full border border-gray-300"></hr>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-4/5">
            {/* email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                type="email"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-blue-400"
              />
            </div>
            {/* password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                type="password"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-blue-400"
              />
            </div>

            {/* remember me + forgot pass */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input type="radio" className="accent-blue-400 " />
                <label htmlFor="remember_me" className="text-sm font-light">
                  Remember Me
                </label>
              </div>
              <Link href="/" className="text-blue-400 text-sm">
                Forgot Password
              </Link>
            </div>

            <button
              type="submit"
              className="bg-blue-400 mt-8 text-white py-2.5 px-8 w-full rounded-md text-lg cursor-pointer"
            >
              Login Now
            </button>
          </form>
          <p className="mt-16 text-gray-600 w-4/5 ">
            Do you have account?{" "}
            <Link href="/register" className="text-blue-400">
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
