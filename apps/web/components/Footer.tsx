import Link from "next/link";

export const Footer = () => {
  return (
    <div className="border-t py-3 md:mt-12 mt-6">
      <div className="container flex items-center  md:justify-between md:flex-row flex-col  md:text-left text-center gap-2">
        <div className="flex gap-3 flex-wrap">
          <Link
            className="text-muted-foreground hover:text-foreground duration-300"
            href={"/"}
          >
            Help & Support
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground duration-300"
            href={"/"}
          >
            Report an Issue
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground duration-300"
            href={"/"}
          >
            Privacy Policy
          </Link>
        </div>
        <div>
          <p className="text-muted-foreground">
            © 2024 Algorithmic Arena. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
