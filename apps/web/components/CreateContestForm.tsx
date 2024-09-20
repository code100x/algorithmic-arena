"use client";
import React, { useCallback, useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Checkbox } from "@repo/ui/checkbox";
import { Button } from "@repo/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";
import { Contest, ContestProblem, Problem } from "@prisma/client";
import { toast } from "react-toastify";
import axios from "axios";

const formSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(2, "Title must be at least 2 characters long")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description cannot exceed 500 characters"),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  hidden: z.boolean().default(false),
});

const CreateContestForm = ({
  intitalProblems,
  intitalContest,
}: {
  intitalProblems: Problem[];
  intitalContest?: Contest & {
    problems: ContestProblem[];
  };
}) => {
  const [problems, setProblems] = useState<Problem[]>(intitalProblems);
  const [query, setquery] = useState("");
  const [selectedProblems, setSelectedProblems] = useState<string[]>(
    intitalContest
      ? intitalContest.problems.map((problem) => problem.problemId)
      : []
  );

  const filterProblems = useCallback(async () => {
    if (!query) {
      setProblems([...intitalProblems]);
      return;
    }
    const filteredProblems = problems.filter((problem) =>
      problem.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    setProblems([...filteredProblems]);
  }, [query]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(intitalContest && {
        title: intitalContest.title,
        description: intitalContest.description,
        startTime: intitalContest.startTime,
        endTime: intitalContest.endTime,
        hidden: !intitalContest.hidden,
      }),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (intitalContest) {
        await axios.post(`/api/contest/${intitalContest.id}`, {
          title: values.title,
          description: values.description,
          hidden: !values.hidden,
          problems: selectedProblems,
          startTime: values.startTime,
          endTime: values.endTime,
        });
      } else {
        await axios.post(`/api/contest`, {
          title: values.title,
          description: values.description,
          hidden: !values.hidden,
          problems: selectedProblems,
          startTime: values.startTime,
          endTime: values.endTime,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 grid md:grid-cols-2 gap-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Hackathon 2024" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about your contest"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormItem>
            <FormLabel>Start Time</FormLabel>
            <FormControl>
              <Input
                onChange={(e) => {
                  form.setValue("startTime", new Date(e.target.value));
                }}
                defaultValue={
                  intitalContest
                    ? intitalContest.startTime.toISOString().split("Z")[0]
                    : ""
                }
                type="datetime-local"
              />
            </FormControl>
            <FormMessage>
              {form.formState.errors.startTime?.message}
            </FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel>End Time</FormLabel>
            <FormControl>
              <Input
                onChange={(e) => {
                  form.setValue("endTime", new Date(e.target.value));
                }}
                defaultValue={
                  intitalContest
                    ? intitalContest.endTime.toISOString().split("Z")[0]
                    : ""
                }
                type="datetime-local"
              />
            </FormControl>
            <FormMessage>{form.formState.errors.endTime?.message}</FormMessage>
          </FormItem>

          <FormField
            control={form.control}
            name="hidden"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Would you like to publish this contest now?
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="mt-6 md:col-span-2">
            <div className="flex items-center flex-wrap gap-2">
              <Input
                onChange={(e) => {
                  setquery(e.target.value);
                }}
                className="w-auto"
                placeholder="Two Sum"
              />
              <Button
                type="button"
                variant={"secondary"}
                onClick={filterProblems}
              >
                Search
              </Button>
            </div>
            <div className="mt-6 border-2  rounded-md overflow-hidden dark:bg-background">
              <div className="flex  bg-muted font-bold">
                <div className="px-2 py-2 flex-1">Name</div>
                <div className="px-2 py-2 text-center w-[100px]">
                  Difficulty
                </div>
                <div className="px-2 py-2 text-center w-[100px]">Status</div>
              </div>
              {problems.map((problem) => (
                <div
                  className="flex text-muted-foreground hover:bg-muted/50 duration-300"
                  key={problem.id}
                >
                  <div className="px-2 py-2 flex-1 font-medium  capitalize flex items-center gap-1">
                    <Checkbox
                      checked={selectedProblems.includes(problem.id)}
                      onCheckedChange={() => {
                        if (selectedProblems.includes(problem.id)) {
                          setSelectedProblems((prev) => {
                            return prev.filter((id) => id !== problem.id);
                          });
                        } else {
                          setSelectedProblems((prev) => {
                            return [...prev, problem.id];
                          });
                        }
                      }}
                    />
                    {problem.title.split("-").join(" ")}
                  </div>
                  <div className=" px-2 py-2 text-center w-[100px] capitalize">
                    {problem.difficulty.toLocaleLowerCase()}
                  </div>
                  <div className="px-2 py-2 text-center w-[100px]">-</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <Button type="submit">Create Contest</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateContestForm;
