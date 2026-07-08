"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import api from "@/services/api";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "next/link";

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
    <Card>

      <h1 className="text-3xl font-bold mb-8">
        Create Account
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
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

        <Button
          loading={loading}
          className="w-full"
        >
          Sign Up
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
  );

}