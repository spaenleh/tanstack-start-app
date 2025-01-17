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
  createUserSchema,
  CreateUserSchema,
} from "@/services/users";
import { useServerFn } from "@tanstack/start";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const register = useServerFn(createUser);
  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (input: CreateUserSchema) => {
    register({ data: input });
  };

  return (
    <div className="p-3">
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>Créer un compte</CardTitle>
          <CardDescription>
            En créant un compte vous accédez à toutes les fonctionnalités de
            l'application.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Créer mon compte</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
