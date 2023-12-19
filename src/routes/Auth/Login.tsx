import Logo from "@/assets/images/lasepa.png";
import Bg from "@/assets/images/obinna-okerekeocha-fGd8paHzN98-unsplash.jpg";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import loginSchema from "@/schema/loginSchema";
import { LoginApiError, LoginApiSuccess } from "@/types/loginApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { z } from "zod";

type FormFields = z.infer<typeof loginSchema>;

const apiEndpoint =
  "https://lasepa-applicant-a00a81c0036a.herokuapp.com/api/v1/login";

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const form = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(rawData: FormFields) {
    try {
      setIsLoading(true);

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rawData),
      });

      if (!response.ok) {
        toast({
          description: "An error occured please try again",
          variant: "destructive",
          className: "md:fixed md:top-4 md:right-8 md:w-auto",
        });
      }

      const data = (await response.json()) as LoginApiError;

      if (!data.success) {
        toast({
          description: "User account doesn't exist",
          variant: "destructive",
          className: "md:fixed md:top-4 md:right-8 md:w-auto",
        });
      }

      const successData = data as unknown as LoginApiSuccess;

      toast({
        description: `Welcome ${successData.data.lastName}`,
        className:
          "bg-[#27502B] text-white md:fixed md:top-4 md:right-8 md:w-auto",
      });

      await new Promise((res) => setTimeout(res, 2000));

      location.href = `https://main.d1ygb46vcr0brr.amplifyapp.com/dashboard?token=${successData.token}`;
    } catch (error) {
      toast({
        description: "An error occured please try again",
        variant: "destructive",
        className: "md:fixed md:top-4 md:right-8 md:w-auto",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center gap-12 md:gap-8">
      <img
        src={Bg}
        alt="lagos"
        className="absolute -z-10 h-full w-full object-cover brightness-[.25]"
      />

      <NavLink
        className="absolute left-3 top-4 z-10 flex items-center gap-1 text-white/60 transition-colors hover:text-[#DC3837] md:left-6 md:gap-2"
        to={"/"}
      >
        <div className="text-2xl">
          <IoIosArrowBack />
        </div>

        <p className="text-sm font-medium md:text-base">Go Back</p>
      </NavLink>

      <img src={Logo} alt="lasepa" className="mt-24 h-14 md:mt-40" />

      <div className="w-full px-4 md:px-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-md space-y-6 rounded-2xl bg-[#f1fbff]/20 px-6 py-8 backdrop-blur-sm md:space-y-5"
          >
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel hidden>Email Address</FormLabel>

                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email address"
                        {...field}
                        className="rounded-lg border-none bg-[#f1fbff]/30 px-4 py-3 text-sm text-white placeholder:text-xs placeholder:uppercase placeholder:text-white/80 focus-visible:ring-0 md:px-5 md:py-4 md:text-sm"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative flex-1">
                    <FormLabel hidden>Password</FormLabel>

                    <FormControl>
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                        className="rounded-lg border-none bg-[#f1fbff]/30 px-4 py-3 text-sm text-white placeholder:text-xs placeholder:uppercase placeholder:text-white/80 focus-visible:ring-0 md:px-5 md:py-4 md:text-sm"
                      />
                    </FormControl>

                    <div
                      className="absolute right-3 top-1/2 !my-0 mt-4 -translate-y-1/2 cursor-pointer text-[#f1fbff]/70 transition-colors hover:text-[#f1fbff]"
                      onClick={() => setIsPasswordVisible((prev) => !prev)}
                    >
                      {isPasswordVisible ? <BsEyeSlashFill /> : <BsEyeFill />}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full rounded-lg border border-none bg-[#378a3f] py-4 text-xs font-semibold md:py-5 md:text-base"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

              {isLoading ? "Please wait ..." : "LOG IN"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
