"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

import api from "@/services/api";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginForm() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {

    try {

      setLoading(true);

      const res = await api.post("/auth/login", data);

      if (res.data.success) {

        router.push("/shortme");

        router.refresh();

      }

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <Card>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="text-gray-400 mt-2">
          Login to continue
        </p>

      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
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

        <Button
          loading={loading}
          className="w-full"
        >
          Login
        </Button>

      </form>

      <div className="text-center mt-6 text-gray-400">

        Don't have an account?

        <Link
          href="/signup"
          className="text-blue-500 ml-2"
        >
          Sign Up
        </Link>

      </div>

    </Card>

  );

}