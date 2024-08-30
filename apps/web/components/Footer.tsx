""
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SiInstagram, SiYoutube, SiX } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import playstore from "../public/playstore.png";
import Logo from "../public/logo.png";

export const Footer = () => {
  return (
    <div className="bg-background text-foreground border border-t-gray-800 bottom-0 w-full p-4 flex justify-center px-6 lg:px-20 print:hidden">
      <div className="md:max-w-screen-2xl mt-4 mx-auto flex flex-col lg:flex-row items-start justify-between lg:w-full">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex gap-3 justify-center md:my-0">
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
            <h4 className="opacity-40  ">© 2024 Algorithmic Arena. All rights reserved.</h4>
            <div className="flex my-3 lg:my-0 mx-2 gap-x-2">
              <Link target="_blank" rel="noopener noreferrer" href={"https://twitter.com/kirat_tw"}>
                <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 20.041C0.5 9.27146 9.23045 0.541016 20 0.541016C30.7696 0.541016 39.5 9.27146 39.5 20.041C39.5 30.8106 30.7696 39.541 20 39.541C9.23045 39.541 0.5 30.8106 0.5 20.041Z" fill="#020817" />
                  <path d="M0.5 20.041C0.5 9.27146 9.23045 0.541016 20 0.541016C30.7696 0.541016 39.5 9.27146 39.5 20.041C39.5 30.8106 30.7696 39.541 20 39.541C9.23045 39.541 0.5 30.8106 0.5 20.041Z" stroke="#1E293B" />
                  <path d="M27.8406 16.8402C27.8406 16.8402 27.6844 15.7371 27.2031 15.2527C26.5938 14.6152 25.9125 14.6121 25.6 14.5746C23.3625 14.4121 20.0031 14.4121 20.0031 14.4121H19.9969C19.9969 14.4121 16.6375 14.4121 14.4 14.5746C14.0875 14.6121 13.4062 14.6152 12.7969 15.2527C12.3156 15.7371 12.1625 16.8402 12.1625 16.8402C12.1625 16.8402 12 18.1371 12 19.4309V20.6434C12 21.9371 12.1594 23.234 12.1594 23.234C12.1594 23.234 12.3156 24.3371 12.7937 24.8215C13.4031 25.459 14.2031 25.4371 14.5594 25.5059C15.8406 25.6277 20 25.6652 20 25.6652C20 25.6652 23.3625 25.659 25.6 25.4996C25.9125 25.4621 26.5938 25.459 27.2031 24.8215C27.6844 24.3371 27.8406 23.234 27.8406 23.234C27.8406 23.234 28 21.9402 28 20.6434V19.4309C28 18.1371 27.8406 16.8402 27.8406 16.8402ZM18.3469 22.1152V17.6184L22.6687 19.8746L18.3469 22.1152Z" fill="#94A3B8" />
                </svg>

              </Link>
              <Link target="_blank" rel="noopener noreferrer" href={"https://www.instagram.com/kirat_ins/"}>
                <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 20.041C0.5 9.27146 9.23045 0.541016 20 0.541016C30.7696 0.541016 39.5 9.27146 39.5 20.041C39.5 30.8106 30.7696 39.541 20 39.541C9.23045 39.541 0.5 30.8106 0.5 20.041Z" fill="#020817" />
                  <path d="M0.5 20.041C0.5 9.27146 9.23045 0.541016 20 0.541016C30.7696 0.541016 39.5 9.27146 39.5 20.041C39.5 30.8106 30.7696 39.541 20 39.541C9.23045 39.541 0.5 30.8106 0.5 20.041Z" stroke="#1E293B" />
                  <path d="M24.2176 13.3105H26.4666L21.5532 18.9262L27.3334 26.5679H22.8076L19.2628 21.9332L15.2067 26.5679H12.9564L18.2117 20.5613L12.6667 13.3105H17.3075L20.5117 17.5468L24.2176 13.3105ZM23.4283 25.2217H24.6745L16.6303 14.586H15.2931L23.4283 25.2217Z" fill="#94A3B8" />
                </svg>

              </Link>
              <Link target="_blank" rel="noopener noreferrer" href={"https://www.youtube.com/@harkirat1"}>
                <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 20.041C0.5 9.27146 9.23045 0.541016 20 0.541016C30.7696 0.541016 39.5 9.27146 39.5 20.041C39.5 30.8106 30.7696 39.541 20 39.541C9.23045 39.541 0.5 30.8106 0.5 20.041Z" fill="#020817" />
                  <path d="M0.5 20.041C0.5 9.27146 9.23045 0.541016 20 0.541016C30.7696 0.541016 39.5 9.27146 39.5 20.041C39.5 30.8106 30.7696 39.541 20 39.541C9.23045 39.541 0.5 30.8106 0.5 20.041Z" stroke="#1E293B" />
                  <path d="M27.8406 16.8402C27.8406 16.8402 27.6844 15.7371 27.2031 15.2527C26.5938 14.6152 25.9125 14.6121 25.6 14.5746C23.3625 14.4121 20.0031 14.4121 20.0031 14.4121H19.9969C19.9969 14.4121 16.6375 14.4121 14.4 14.5746C14.0875 14.6121 13.4062 14.6152 12.7969 15.2527C12.3156 15.7371 12.1625 16.8402 12.1625 16.8402C12.1625 16.8402 12 18.1371 12 19.4309V20.6434C12 21.9371 12.1594 23.234 12.1594 23.234C12.1594 23.234 12.3156 24.3371 12.7937 24.8215C13.4031 25.459 14.2031 25.4371 14.5594 25.5059C15.8406 25.6277 20 25.6652 20 25.6652C20 25.6652 23.3625 25.659 25.6 25.4996C25.9125 25.4621 26.5938 25.459 27.2031 24.8215C27.6844 24.3371 27.8406 23.234 27.8406 23.234C27.8406 23.234 28 21.9402 28 20.6434V19.4309C28 18.1371 27.8406 16.8402 27.8406 16.8402ZM18.3469 22.1152V17.6184L22.6687 19.8746L18.3469 22.1152Z" fill="#94A3B8" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
