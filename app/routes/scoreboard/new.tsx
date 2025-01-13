import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/scoreboard/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm();
  const onSubmit = () => {};

  return (
    <div className="p-3">
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>New Score board</CardTitle>
          <CardDescription>
            This will allow you to count points for a game
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="boardName"
                render={(field) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="fun game" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of the scoreboard
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="justify-end">
              <Button type="submit">Create</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
