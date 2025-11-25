"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.svg";
import registerImg from "@/assets/images/registration.png";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function Register() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();
  useAuth(false);
  const fetchRegister = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/create",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      console.log("register data", res.data);
      router.push("/");
      return res.data;
    } catch (error) {
      console.log("failed to register!", error);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    alert("form submitted");
    console.log("form data", data);
    fetchRegister(data.firstName, data.lastName, data.email, data.password);
  };
  return (
    <section className=" bg-gray-100">
      <div className="max-w-7xl mx-auto flex justify-evenly items-center min-h-screen py-20">
        <div className="">
          <Image src={registerImg} alt="login_img" className="w-auto h-auto" />
        </div>

        <div className="bg-white p-8 flex flex-col items-center w-2/5 rounded-md">
          <Image src={logo} alt="logo" className="w-auto h-auto" />
          <div className="mt-8 mb-12 space-y-2 text-center">
            <p className="text-lg">Get Started Now</p>
            <h3 className="text-2xl font-medium">Registration</h3>
          </div>
          <button className="border cursor-pointer border-gray-100 rounded-md  py-2 px-8 flex items-center gap-2 font-medium text-lg">
            <FcGoogle size={24} />
            Register with Google
          </button>
          <div className="my-8 flex items-center w-4/5 gap-4">
            <hr className="w-full border border-gray-300"></hr>
            Or
            <hr className="w-full border border-gray-300"></hr>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-4/5">
            {/* firstName */}
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName">First Name</label>
              <input
                {...register("firstName")}
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-blue-400"
              />
            </div>
            {/* lastName */}
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName">Last Name</label>
              <input
                {...register("lastName")}
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-blue-400"
              />
            </div>
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
                <label
                  htmlFor="terms_conditions"
                  className="text-sm font-light"
                >
                  I agree terms & conditions
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-400 mt-8 text-white py-2.5 px-8 w-full rounded-md text-lg cursor-pointer"
            >
              Register
            </button>
          </form>
          <p className="mt-16 text-gray-600 w-4/5 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400">
              login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
