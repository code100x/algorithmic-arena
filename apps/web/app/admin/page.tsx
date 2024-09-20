import AdminDashBoard from "../../components/Admin/AdminDashBoard";
import styles from "./page.module.css";

export default function Page(): JSX.Element {
  return (
    <div className="flex min-h-screen w-full flex-col px-28 pt-8 pb-14">
      <div className="text-slate-50 text-[32px] font-bold leading-10 pl-10">
        Dashboard
      </div>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <AdminDashBoard />
      </main>
    </div>
  );
}

export const dynamic = "force-dynamic";
