import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-4 md:px-6 py-3 flex items-center justify-between">
      <div className="text-sm">&copy; 2024 Code100x. All rights reserved.</div>
      <nav className="hidden md:flex items-center gap-6">
        <Link href="#" className="hover:underline" prefetch={false}>
          About
        </Link>
        <Link href="#" className="hover:underline" prefetch={false}>
          Contact
        </Link>
        <Link href="#" className="hover:underline" prefetch={false}>
          Privacy Policy
        </Link>
        <Link href="#" className="hover:underline" prefetch={false}>
          Terms of Service
        </Link>
      </nav>
    </footer>
  );
}
