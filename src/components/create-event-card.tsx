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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";

import { eventSchema, TEvent } from "@/schemas/event";
import { createEvent } from "@/server-actions/create-event";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateEventCard = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<TEvent>({
    resolver: zodResolver(eventSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (data: TEvent) => {
    setLoading(true);

    const { success, message } = await createEvent(data);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }

    setLoading(false);
  };

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-secondary text-secondary-foreground"
                    placeholder="20xx-20xx"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          variant="secondary"
          disabled={loading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Create {loading ? <Loader2 className="animate-spin" /> : <Plus />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateEventCard;
