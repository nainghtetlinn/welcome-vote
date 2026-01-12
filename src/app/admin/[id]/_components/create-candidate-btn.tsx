"use client";

import ProfileImage from "@/assets/profile.png";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Plus } from "lucide-react";

import { candidateSchema, TCandidate } from "@/schemas/candidate";
import { createCandidate } from "@/server-actions/create-candidate";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const CreateCandidateBtn = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string>();

  const { id: name } = useParams<{ id: string }>();

  const form = useForm<TCandidate>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      name: "",
      roll_no: "",
      gender: "male",
      photo: undefined,
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    form.setValue("photo", file, { shouldValidate: true });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  const onSubmit = async (data: TCandidate) => {
    setLoading(true);

    const { success, message } = await createCandidate({
      ...data,
      event_name: name,
    });
    if (success) {
      toast.success(message);
      setOpen(false);
      setPreview(undefined);
      form.reset();
    } else {
      toast.error(message);
    }

    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="w-10 h-10 rounded-full"
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Candidate</DialogTitle>
          <DialogDescription>
            Click save to create new candidate.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <FormField
            control={form.control}
            name="photo"
            render={() => (
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg w-50 h-50 cursor-pointer overflow-hidden flex items-center justify-center
            ${isDragActive ? "border-primary bg-muted" : "border-border"}
          `}
                  >
                    <input {...getInputProps()} />

                    {preview ? (
                      <Image
                        src={preview}
                        alt="Profile"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-sm px-2 text-muted-foreground">
                        <Image
                          src={ProfileImage}
                          alt="Placeholder"
                          width={100}
                          height={100}
                          className="mx-auto mb-2 opacity-70"
                        />
                        {isDragActive
                          ? "Drop image here"
                          : "Drag & drop or click to upload"}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roll_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roll no.</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="male"
                        id="m"
                      />
                      <Label htmlFor="m">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="female"
                        id="f"
                      />
                      <Label htmlFor="f">Female</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </Form>

        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => {
              form.reset();
              setPreview(undefined);
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
