"use client";

import { FC, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import MainBody from "@/components/MainBody";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import { CountersColumnTypes } from "../../components/columns";
import AlertModal from "@/components/modals/AlertModal";
import ImageUpload from "@/components/ui/ImageUpload";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Counter, Department, User } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1),
  online: z.boolean().default(false).optional(),
  userId: z.string().min(1),
  departmentId: z.string().min(1),
});

type CounterFormValues = z.infer<typeof formSchema>;

interface CounterFormPops {
  initialData: CountersColumnTypes | any | null;
  departmentsData: { id: string; departmentName: string }[];
  usersData: { id: string; name: string }[];
}

const CounterForm: FC<CounterFormPops> = ({
  initialData,
  departmentsData,
  usersData,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Counter" : "Create Counter";
  const description = initialData ? "Edit a Counter" : "Add new Counter";
  const toastMessage = initialData ? "Counter updated!!" : "Counter Created!!";
  const action = initialData ? "Save changes" : "Create";

  const params = useParams();
  const router = useRouter();

  const form = useForm<CounterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      online: true,
      userId: "",
      departmentId: "",
    },
  });

  const onSubmit = async (data: CounterFormValues) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(`/api/counters/${params?.counterId}`, data);
      } else {
        await axios.post(`/api/counters`, data);
      }
      router.refresh();
      router.push("/admin/counters");
      toast({
        description: toastMessage,
        variant: "success",
      });
    } catch (error: any) {
      console.log(error);
      if (error.response.data) {
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

  const onDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/counters/${params?.counterId}`);
      router.refresh();
      router.push(`/admin/counters`);
    } catch (error) {
      toast({
        description: "Something went wrong!!",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainBody>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-1 space-y-2 lg:grid-cols-3 lg:gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Name of Counter"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Users Name</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select the user"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {usersData ? (
                        usersData.map((user) => (
                          <SelectItem value={user.id} key={user.id}>
                            {user.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="NAN">No users available!</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage/create users here{" "}
                    <Link href="/admin/users">
                      <span className="text-fuchsia-600">Users settings.</span>
                    </Link>
                    .
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departments Name</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select the department"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departmentsData ? (
                        departmentsData.map((department) => (
                          <SelectItem value={department.id} key={department.id}>
                            {department.departmentName}
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
                    <Link href="/admin/departments">
                      <span className="text-fuchsia-600">
                        Department settings.
                      </span>
                    </Link>
                    .
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="online"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Online Status</FormLabel>
                    <FormDescription>
                      Is counter online or active to resolve token?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </MainBody>
  );
};

export default CounterForm;
