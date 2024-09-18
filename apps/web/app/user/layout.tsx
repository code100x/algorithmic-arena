import React from "react";
import SettingAsideBar from "../../components/SettingAsideBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container grid">
      <div className=" grid flex-1 gap-12 md:grid-cols-[200px_1fr] ">
        <aside className=" md:pt-12 pt-6 hidden w-[200px] flex-col md:flex  border-r p-3">
          <SettingAsideBar />
        </aside>
        <div className="md:pt-12 pt-6">{children}</div>
      </div>
    </div>
  );
};

export default layout;
