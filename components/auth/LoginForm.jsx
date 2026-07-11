"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

import api from "@/services/api";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { SvgLink } from "../svg/Svg";

export default function LoginForm() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      setLoading(true);
      setFormError("");

      const res = await api.post("/auth/login", data);

      if (res.data.success) {
        router.push("/shortme");
        router.refresh();
      }
    } catch (err) {
      console.log(err.response.data)
      setFormError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f5ff] px-4 py-8">
    <div className="absolute -left-5 -top-5 h-50 w-44 rounded-full bg-[#4201c6]/20 blur-2xl" />

      <Card>
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-lg bg-[#4201c6] p-1">
              <SvgLink />
            </span>
            <h1 className="text-xl font-bold text-[#4201c6]">Shortme</h1>
          </div>

          <div className="mt-6 text-center">
            <h2 className="text-3xl font-bold text-black">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-[#484457]">
              Please enter your details to sign in.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            <Input
              label="Email"
              type="email"
              placeholder="john@gmail.com"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="********"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
              })}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#484457]">
                <input
                  type="checkbox"
                  className="rounded border-[#c9c3da] text-[#4201c6] focus:ring-[#4201c6]"
                />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="font-medium text-[#4201c6] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {formError && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">
                {formError}
              </div>
            )}

            <Button
              loading={loading}
              className="w-full"
            >
              Login
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?

            <Link
              href="/signup"
              className="ml-2 font-medium text-blue-500"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );

}