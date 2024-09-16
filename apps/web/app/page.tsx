import { getServerSession } from "next-auth";
import { Landing } from "../components/Landing";
import { authOptions } from "./lib/auth";
import styles from "./page.module.css";
import { redirect } from "next/navigation";

export default async function Page() {
  // redirect to problems page if user is already logged in
  const auth = await getServerSession();
  if (auth?.user) {
    redirect("/problems");
  }
  return (
    <main>
      <Landing />
    </main>
  );
}

export const dynamic = "force-dynamic";
