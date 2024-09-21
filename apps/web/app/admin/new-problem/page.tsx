"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/breadcrumb";
import ProblemCreationForm from "../../../components/Admin/ProblemCreation";

const ProblemCreationPage = () => {
  return (
    <div className="space-y-6 text-slate-50 px-28 pt-8 pb-14">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/problems" className="text-blue-500">
              Problems
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create New Problem</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center space-x-2">
        <ArrowLeft className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Create New Problem</h1>
      </div>

      <ProblemCreationForm />
    </div>
  );
};

export default ProblemCreationPage;
