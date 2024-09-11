import Link from "next/link";
import { SiInstagram, SiYoutube, SiX } from "@icons-pack/react-simple-icons";
export const Footer = () => {
  return (
    <div className="bg-background text-foreground border border-t-gray-800 bottom-0 w-full p-4 flex justify-center px-6 lg:px-20 print:hidden">
      <div className="md:max-w-screen-2xl mt-4 mx-auto flex flex-col lg:flex-row items-center md:items-start justify-between lg:w-full">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex gap-3 justify-center text-sm md:text-base md:my-0">
            <Link
              href={"https://github.com/code100x/daily-code/"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              GitHub
            </Link>
            <Link href={"/tnc"} className="hover:text-blue-500">
              Terms & Conditions
            </Link>
            <Link href={"/privacy-policy"} className="hover:text-blue-500">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center flex-col-reverse lg:flex-row justify-center">
            <h4 className="opacity-40 text-center">© 2024 Algorithmic Arena. All rights reserved.</h4>
            <div className="flex my-3 lg:my-0 mx-2 gap-x-2">
              <Link target="_blank" rel="noopener noreferrer" href={"https://twitter.com/kirat_tw"}>
                <SiYoutube />
              </Link>
              <Link target="_blank" rel="noopener noreferrer" href={"https://www.instagram.com/kirat_ins/"}>
                <SiX />
              </Link>
              <Link target="_blank" rel="noopener noreferrer" href={"https://www.youtube.com/@harkirat1"}>
                <SiInstagram />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
