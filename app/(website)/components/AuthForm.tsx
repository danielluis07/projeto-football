"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { useState, useEffect, useCallback } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      name: "",
      apikey: "",
    },
  });

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios.post("api/register", data);
    }

    if (variant === "LOGIN") {
    }
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        ">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <>
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="name"
                label="Nome"
              />
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="email"
                label="Email"
                type="email"
              />
            </>
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="apikey"
            label="Chave Api"
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Entrar" : "Registrar"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "></div>
          </div>
        </div>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          ">
          <div>
            {variant === "LOGIN" ? "É novo por aqui?" : "Já possui uma conta?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Crie uma conta" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
