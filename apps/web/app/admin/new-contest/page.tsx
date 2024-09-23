import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/breadcrumb";
import { ArrowLeft } from "lucide-react";
import CreateContest from "../../../components/Admin/CreateContest";

const CreateContestPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="text-sm breadcrumbs mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/contests" className="text-blue-500">
                Contests
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-400">
                Create New Contest
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Page Heading */}
      <div className="flex items-center text-gray-400 space-x-4 mb-6">
        <ArrowLeft className="mt-1" width={16} height={16} />
        <div className="text-slate-50 text-[32px] font-bold leading-10">
          Create New Contest
        </div>
      </div>

      <CreateContest />
    </div>
  );
};

export default CreateContestPage;
