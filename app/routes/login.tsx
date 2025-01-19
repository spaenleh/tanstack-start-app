import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import {
  createUser,
  UserCredentials,
  userCredentialsSchema,
} from "@/services/users";
import { useServerFn } from "@tanstack/start";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const registerFn = useServerFn(createUser);
  const register = useMutation({ mutationFn: registerFn });
  const form = useForm<UserCredentials>({
    resolver: zodResolver(userCredentialsSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = (input: UserCredentials) => {
    register.mutate({ data: input });
  };

  return (
    <div className="p-3">
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>Create an account or log in</CardTitle>
          <CardDescription>
            You can simply create an account or log into your existing account.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
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
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {register.data
                  ? register.data.error && (
                      <FormMessage>{register.data.message}</FormMessage>
                    )
                  : null}
                <Button type="submit">Log in</Button>
              </div>
            </form>
          </CardContent>
        </Form>
      </Card>
    </div>
  );
}
