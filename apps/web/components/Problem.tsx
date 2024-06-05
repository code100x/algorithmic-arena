/**
 * v0 by Vercel.
 * @see https://v0.dev/t/icxUukXo17C
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@repo/ui/button";
import { Avatar, AvatarFallback } from "@repo/ui/avatar";
import { Label } from "@repo/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui/select";
import { Textarea } from "@repo/ui/textarea";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 md:py-12 grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <div className="prose prose-stone dark:prose-invert">
            <h2 className="text-2xl font-bold">Problem A - Watermelon</h2>
            <h3>Problem Description</h3>
            <p>
              One hot summer day, Polycarp bought a watermelon. He decided to
              cut it in half to eat it with his friend. However, when Polycarp
              tried to cut the watermelon, it broke into more than two pieces.
              Now Polycarp and his friend are left with a real mess. They have
              to pick up the pieces and put the watermelon back together.
            </p>
            <p>
              Given the number of pieces the watermelon was broken into, your
              task is to determine whether Polycarp and his friend can put the
              watermelon back together so that each of them gets at least one
              piece.
            </p>
            <h3>Input</h3>
            <p>
              The first and only line of the input contains an integer n (2 ≤ n
              ≤ 100) — the number of pieces the watermelon was broken into.
            </p>
            <h3>Output</h3>
            <p>
              If Polycarp and his friend can put the watermelon back together so
              that each of them gets at least one piece, print "YES" (without
              quotes). Otherwise, print "NO" (without quotes).
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <form>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="cpp">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select defaultValue="800">
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="800">800</SelectItem>
                      <SelectItem value="1000">1000</SelectItem>
                      <SelectItem value="1200">1200</SelectItem>
                      <SelectItem value="1400">1400</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="code">Your Code</Label>
                <Textarea
                  id="code"
                  rows={10}
                  placeholder="Enter your code here"
                />
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </main>
      <footer className="bg-gray-900 text-white px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="text-sm">
          &copy; 2024 Codeforces. All rights reserved.
        </div>
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
    </div>
  );
}
