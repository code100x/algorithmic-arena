import Link from "next/link";
import { SiGithub, SiYoutube, SiX } from "@icons-pack/react-simple-icons";

export const Footer = () => {
  return (
    <div className="bg-background text-foreground border border-coolGray-900 w-full p-4 flex flex-col items-center px-6 lg:px-20 print:hidden md:mt-12 mt-6">
      <div className="flex flex-col lg:flex-row w-full md:max-w-screen-2xl">
        {/* Links Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center lg:flex-1 lg:order-1 mb-4 lg:mb-0">
          <div className="flex flex-col lg:flex-row lg:gap-6 text-sm md:text-base lg:flex-1 lg:justify-start lg:items-center">
            <Link
              href={""}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              Help & Support
            </Link>
            <Link href={"/tnc"} className="hover:text-blue-500">
              Terms & Conditions
            </Link>
            <Link href={"/privacy-policy"} className="hover:text-blue-500">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Social Icons and Copyright */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:flex-1 lg:order-2 lg:gap-6 mt-4 lg:mt-0 text-center lg:text-left">
          <h4 className="opacity-40 text-sm md:text-base">
            © 2024 Algorithmic Arena. All rights reserved.
          </h4>

          <div className="flex gap-4 mb-4 lg:mb-0 justify-center">
            <Link
              href={"https://www.youtube.com/@harkirat1"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-[#1E293B] text-white border border-[#1E293B] rounded-full hover:bg-gray-700 transition-colors"
              aria-label="YouTube"
            >
              <SiYoutube className="w-5 h-5 bg-coolGray-900" />
            </Link>
            <Link
              href={"https://x.com/kirat_tw"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-[#1E293B] text-white border border-[#1E293B] rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Instagram"
            >
              <SiX className="w-5 h-5 bg-coolGray-900" />
            </Link>
            <Link
              href={"https://github.com/code100x/algorithmic-arena"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-[#1E293B] text-white border border-[#1E293B] rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Instagram"
            >
              <SiGithub className="w-5 h-5 bg-coolGray-900" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
