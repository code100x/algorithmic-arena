"use client";

import { useState } from "react";

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); 

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="relative">
            {/* Hamburger Button for Mobile */}
            <button
                className="bg-white dark:bg-black p-2 rounded-md md:hidden mb-4 block" 
                onClick={toggleSidebar}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            {/* Sidebar */}
            <div className={`bg-white dark:bg-[#0F172A] w-64 h-auto mt-36 p-10 rounded-lg border border-gray-300 dark:border-gray-600 absolute md:relative transition-transform duration-300 ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-lg`}>
            <img
          className="hidden dark:block mb-6"
          src="/App-logo-light.svg"
          alt="Light mode hero image"
        />
        <img
          className="block dark:hidden mb-6"
          src="/App-logo-dark.svg"
          alt="Dark mode hero image"
        />
            

                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="w-full text-left bg-white dark:bg-gray-800 rounded-md px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200 flex items-center justify-between border-b-2"
                    >
                        <span>100x-Algo</span>
                        <svg className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="relative mt-2">
                            <div className="absolute top-1 h-36 w-0.5 bg-gray-500"></div>
                            <ul className="flex flex-col items-start space-y-4 mt-6 relative">
                                {['0-100 DSA', 'FullStack DSA', 'Frontend DSA'].map((item, index) => (
                                    <li key={index} className="relative pl-8">
                                        <div className="absolute left-0 top-1/2 h-0.5 w-8 bg-gray-500"></div>
                                        <a href="/roadmap" className="block px-4 py-2 bg-white dark:bg-gray-800 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200 border-b-2">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
