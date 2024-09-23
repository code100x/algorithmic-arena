"use client";

import React from "react";

import BookmarksTable from "../../components/Tables/BookmarksTable";

const BookmarksPage = () => {
  return (
    <main className="flex flex-col w-full max-w-6xl mx-auto py-8 px-20 mb-6 dark:text-white text-black">
      <h1 className="text-2xl font-bold">Bookmarks</h1>
      <p className="text-sm text-gray-500 mb-6 pb-6">
        <span>Easily access your saved problems and revisit them </span>
        <span>anytime.</span>
      </p>

      <BookmarksTable />
    </main>
  );
};

export default BookmarksPage;
