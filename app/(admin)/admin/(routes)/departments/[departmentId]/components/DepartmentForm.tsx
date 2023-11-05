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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DepartmentsColumnTypes } from "../../components/columns";
import AlertModal from "@/components/modals/AlertModal";

const formSchema = z.object({
  schoolName: z.string().min(1),
  departmentName: z.string().min(1),
  code: z.string().min(1),
});

type DepartmentFormValues = z.infer<typeof formSchema>;

interface DepartmentFormPops {
  initialData: DepartmentsColumnTypes | null;
}

const DepartmentForm: FC<DepartmentFormPops> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Department" : "Create Department";
  const description = initialData ? "Edit a Department" : "Add new Department";
  const toastMessage = initialData
    ? "Department updated!!"
    : "Department Created!!";
  const action = initialData ? "Save changes" : "Create";

  const params = useParams();
  const router = useRouter();

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      schoolName: "",
      departmentName: "",
      code: "",
    },
  });

  const onSubmit = async (data: DepartmentFormValues) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(`/api/departments/${params?.departmentId}`, data);
      } else {
        await axios.post(`/api/departments`, data);
      }

      router.refresh();
      router.push("/admin/departments");
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
      }
      // toast({
      //   description: "Something went wrong!!",
      //   variant: "destructive",
      //   action: <ToastAction altText="Try again">Try again</ToastAction>,
      // });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/departments/${params?.departmentId}`);
      router.refresh();
      router.push(`/departments`);
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="schoolName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="eg: School of Engineering"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departmentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="eg:  Department of Computer Science"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="eg: docs_001"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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

export default DepartmentForm;
