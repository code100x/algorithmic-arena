"use client";

import Link from "next/link";

export default function SlidingTable({ isOpen, onClose, problems }) {
  return (
    <div
  className={`fixed top-0 right-0 w-full md:w-[60rem] h-full bg-white dark:bg-[#020817] shadow-lg transition-transform transform ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`}
  style={{ zIndex: 1000 }}
>
  <button
    onClick={onClose}
    className="absolute top-2 right-2 text-lg font-bold"
  >
    ✖
  </button>
  <h2 className="text-xl font-bold text-center mt-4">DSA Questions</h2>

  <table className="w-full mt-4 bg-white dark:bg-[#020817] rounded-lg shadow-md overflow-hidden">
    <thead className="bg-gray-100 dark:bg-gray-700">
      <tr>
        <th className="text-left p-4 font-semibold">S.No</th>
        <th className="text-left p-4 font-semibold">Problem</th>
        <th className="text-left p-4 font-semibold">Difficulty</th>
        <th className="text-left p-4 font-semibold">Link</th>
        <th className="text-left p-4 font-semibold">Status</th>
      </tr>
    </thead>
    <tbody>
      {problems.map((problem, index) => (
        <tr
          key={problem.id}
          className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <td className="p-2 md:p-4">{index + 1}</td>
          <td className="p-2 md:p-4 capitalize">{problem.title.split("-").join(" ")}</td>
          <td className="p-2 md:p-4 capitalize">
            <span className="inline-block bg-[#FB923C] text-white text-sm font-semibold rounded-full px-2 py-1 capitalize">
              {problem.difficulty}
            </span>
          </td>
          <td className="p-2 md:p-4">
            <Link href={`/problem/${problem.id}`} className="text-blue-500 dark:text-blue-400 hover:underline">
              🔍 View
            </Link>
          </td>
          <td className="p-2 text-center"><input type="checkbox" className="w-4 h-4" /></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}
