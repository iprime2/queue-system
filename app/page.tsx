"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/Heading";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(4),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const { email, password } = data;
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      router.push("/admin");
      toast({
        title: "Signed In!",
        description: "Redirecting to dashboard!",
        variant: "success",
      });
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data) {
        toast({
          title: error.code,
          description: error.response.data,
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        toast({
          description: "Something went wrong!!",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-black/80 h-screen p-5">
      <div className="flex w-full md:w-[80%] lg:w-[50%] my-20 h-auto flex-col border rounded-md items-center px-2 py-4 md:p-10 gap-2 bg-white">
        <div className="flex w-full">
          <Heading
            title={"Sign In"}
            description={"Enter the email and password."}
          />
        </div>
        <Separator />
        <div className="flex items-center w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 w-full"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Email"
                        {...field}
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
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Password"
                        type="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
          control={form.control}
          name="departmentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departments Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departmentsNameData ? (
                    departmentsNameData.map((department) => (
                      <SelectItem value={department} key={department}>
                        {department}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="NAN">
                      No department available!
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage/create departments here{" "}
                <Link href="/departments">
                  <span className="text-fuchsia-600">Department settings.</span>
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
              <Button
                disabled={loading}
                className="w-full ml-auto"
                type="submit"
              >
                {loading ? (
                  <>
                    <ClipLoader color="white" size="20" />
                    &nbsp;&nbsp;&nbsp;
                    <span>Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
