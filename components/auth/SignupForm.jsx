"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import api from "@/services/api";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "next/link";
import { SvgAnalytics, SvgGithub, SvgGoogle, SvgLink, SvgSecure } from "../svg/Svg";

export default function SignupForm() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  async function onSubmit(data) {

    try {

      setLoading(true);

      const res = await api.post("/auth/signup", data);

      alert(res.data.message);

      router.push("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  }

  return (
    <div className="grid grid-cols-1 sm:gap-8 lg:grid-cols-2 ">
          <div className="hidden sm:block fixed left-[-20px] top-[-20px] h-50 w-44 rounded-full bg-[#4201c6]/20 blur-2xl" />
          <div className="hidden sm:block fixed right-[-20px] bottom-[-20px] z-0 h-50 w-44 rounded-full bg-[#4201c6]/20 blur-2xl" />

      <div className="flex relative z-50 items-center justify-center pt-6 sm:py-8 lg:py-0">
        <div className="w-full max-w-xl text-center lg:text-left">
          <div className="flex gap-2.5 items-center justify-center lg:justify-start">
            <span className="bg-[#4201c6] p-1 rounded-lg size-10 flex justify-center items-center"><SvgLink /></span>
            <h1 className="text-xl font-bold text-[#4201c6]">Shortme</h1>
          </div>
          <div className="mt-6 font-bold text-xl sm:text-2xl leading-7">
            Precision-engineered for <br />
            enterprise scaling.
          </div>

          <div className="mt-4 text-[#484457]">
            Join thousands of developers managing billions of
            interactions with our premium link infrastructure.
          </div>

          <div className="mt-8 hidden sm:flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <div className="flex-1 rounded-2xl border border-[#e7e2f5] bg-[#f8f6ff] p-4 shadow-sm">
              <div className=" flex mx-auto lg:mx-0 size-10 items-center justify-center rounded-full bg-white">
                <span><SvgAnalytics /></span>
              </div>
              <h3 className=" font-semibold text-[#1f1635]">Real-time Analytics</h3>
              <p className=" text-sm text-[#6b6580]">
                Deep insights into every click and conversion.
              </p>
            </div>
            <div className="flex-1 rounded-2xl border border-[#e7e2f5] bg-[#f8f6ff] p-4 shadow-sm">
              <div className=" flex lg:mx-0 mx-auto size-10 items-center justify-center rounded-full bg-white">
                <span><SvgSecure /></span>
              </div>
              <h3 className=" font-semibold text-[#1f1635]">Enterprise Security</h3>
              <p className=" text-sm text-[#6b6580]">
                SSO, audit logs, and encrypted redirection.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-center w-full">
        <Card>
          <h1 className="text-3xl font-bold mb-4 text-black">
            Create an Account
          </h1>
          <span className="text-sm ">
            Start your 14-day premium trial today.
          </span>
            
             {/* <div className="flex justify-around items-center  py-4 *:px-10 *:rounded-2xl *:border-2 *:border-[#c9c3da] *:py-3.5 py*:text-lg *:font-medium">
              <span className="flex justify-center items-center gap-2.5"><SvgGoogle/>Google</span>
              <span className="flex justify-center items-center gap-2.5"><SvgGithub/>github</span>
             </div> */}
            {/* <div className="flex gap-2 justify-center items-center py-2">
              <div className="border flex-1"></div>
              <div className="text-sm">OR SIGN UP WITH EMAIL</div>
              <div className="border flex-1"></div>
            </div> */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mt-6"
          >

            <Input
              label="Username"
              placeholder="John"
              error={errors.username?.message}
              {...register("username", {
                required: "Username is required"
              })}
            />

            <Input
              label="Email"
              type="email"
              placeholder="abc@gmail.com"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required"
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="******"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required"
              })}
            />

            <div className="flex items-center gap-4 py-2">
                <input type="checkbox" />
                <p>I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span></p>
            </div>
            
            <Button
              loading={loading}
              className="w-full"
            >
              Create Account
            </Button>

          </form>
          <div className="text-center mt-6 text-gray-400">

            Already have an account?

            <Link
              href="/login"
              className="text-blue-500 ml-2"
            >
              Login
            </Link>

          </div>
        </Card>
      </div>
    </div>
  );

}