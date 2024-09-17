import { ArrowDownRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  const links: { name: string; items: { name: string; href: string }[] }[] = [
    {
      name: "Contests",
      items: [
        {
          name: "Manage Contests",
          href: "/admin/contests",
        },
        {
          name: "Create Contest",
          href: "/admin/contests/create",
        },
      ],
    },
  ];
  return (
    <div className="container md:mt-12 mt-6">
      <h1 className="lg:text-3xl md:text-2xl text-lg font-bold text-muted-foreground">
        Admin Controls
      </h1>

      <div className="text-lg gap-3 flex flex-col mt-12">
        {links.map((link, index) => (
          <div key={index}>
            <h2 className="text-lg font-bold text-muted-foreground">
              {link.name}
            </h2>
            <div className="flex flex-col">
              {link.items.map((item, j) => (
                <Link
                  key={`${index}-${j}`}
                  href={item.href}
                  className="inline-flex gap-1 ml-2 items-center text-muted-foreground hover:text-foreground duration-300 underline"
                >
                  {item.name}
                  <ArrowDownRight size={16} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
