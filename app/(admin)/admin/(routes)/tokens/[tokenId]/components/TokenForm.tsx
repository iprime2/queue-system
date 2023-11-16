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
import AlertModal from "@/components/modals/AlertModal";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { TokensColumnTypes } from "../../components/columns";
import { useQueue } from "@/hooks/useQueue";

const statusData = ["pending", "progress", "completed"];

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  tokenNo: z.coerce.number().min(1),
  status: z.string().min(1),
  departmentId: z.string().min(1),
  counterId: z.string().min(1),
  userId: z.string().min(1),
  isCompleted: z.boolean().default(false).optional(),
});

type TokenFormValues = z.infer<typeof formSchema>;

interface TokenFormPops {
  initialData: TokensColumnTypes | any | null;
  countersData: {
    id: string;
    name: string;
  }[];
  departmentsData: { id: string; departmentName: string; createdAt: Date }[];
  usersData: { id: string; name: string; createdAt: Date }[];
  tokenNo: number;
}

const TokenForm: FC<TokenFormPops> = ({
  initialData,
  countersData,
  departmentsData,
  usersData,
  tokenNo = 0,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit token" : "Create token";
  const description = initialData ? "Edit a token" : "Add new token";
  const toastMessage = initialData ? "Token updated!!" : "Token Created!!";
  const action = initialData ? "Save changes" : "Create";

  const params = useParams();
  const router = useRouter();

  const { queue, add } = useQueue();

  console.log(queue);

  const form = useForm<TokenFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      tokenNo: tokenNo,
      status: "pending",
      departmentId: "",
      counterId: "",
      userId: "",
      isCompleted: false,
    },
  });

  const onSubmit = async (data: TokenFormValues) => {
    setLoading(true);
    try {
      let token;
      if (initialData) {
        token = await axios.patch(`/api/tokens/${params?.tokenId}`, data);
      } else {
        token = await axios.post(`/api/tokens`, data);
      }
      add(token.data);
      console.log(queue);

      router.refresh();
      router.push("/admin/tokens");
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
      await axios.delete(`/api/tokens/${params?.tokenId}`);
      router.refresh();
      router.push(`/admin/tokens`);
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
          className="space-y-6 w-full"
        >
          <div className="grid grid-cols-1 space-y-2 lg:grid-cols-3 lg:gap-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Title of Token"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description of Token"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tokenNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token No</FormLabel>
                  <FormControl>
                    <Input
                      disabled={tokenNo ? true : false}
                      placeholder="Token Number"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select the status"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusData ? (
                        statusData.map((status) => (
                          <SelectItem value={status} key={status}>
                            {status}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="NAN">
                          No status available!
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loading}
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
                          No departments available!
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage/create departments here{" "}
                    <Link href="/admin/departments">
                      <span className="text-fuchsia-600">
                        Counters settings.
                      </span>
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="counterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Counters</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!initialData ? true : loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select the counter"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countersData ? (
                        countersData.map((counter) => (
                          <SelectItem value={counter.id} key={counter.id}>
                            {counter.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="NAN">
                          No counters available!
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage/create counters here{" "}
                    <Link href="/admin/counters">
                      <span className="text-fuchsia-600">
                        Counters settings.
                      </span>
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="counterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Users</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!initialData ? true : loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select the counter"
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
                      <span className="text-fuchsia-600">
                        Counters settings.
                      </span>
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isCompleted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Complete Status</FormLabel>
                    <FormDescription>Is token is completed!</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!initialData ? true : loading}
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

export default TokenForm;
