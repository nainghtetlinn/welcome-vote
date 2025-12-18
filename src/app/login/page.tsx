"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, LogIn } from "lucide-react";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { loginSchema, TLogin } from "@/schemas/login";
import { login } from "@/server-actions/login";

const Login = () => {
  const form = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string>();
  const captchaRef = useRef<HCaptcha>(null);

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!captchaToken) return;

    setLoading(true);
    setSuccess(false);

    const { success, message } = await login(data, captchaToken);
    if (!success) {
      toast.error(message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  });

  useEffect(() => {
    if (success) {
      captchaRef.current?.resetCaptcha();
    }
  }, [success]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Form {...form}>
        <form
          className="w-full max-w-100"
          onSubmit={handleSubmit}
        >
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormInput
                    label="Email"
                    {...field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormInput
                    label="Password"
                    type="password"
                    {...field}
                  />
                )}
              />
              <HCaptcha
                ref={captchaRef}
                sitekey={process.env.NEXT_PUBLIC_SITEKEY!}
                onVerify={(token) => {
                  setCaptchaToken(token);
                }}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                disabled={loading || !captchaToken}
              >
                {loading ? <Loader2 className="animate-spin" /> : <LogIn />}
                Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

const FormInput = ({
  label,
  ...props
}: React.ComponentProps<"input"> & { label: string }) => (
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <Input {...props} />
    </FormControl>
    <FormMessage />
  </FormItem>
);

export default Login;
