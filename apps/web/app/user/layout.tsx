import React from "react";
import SettingAsideBar from "../../components/SettingAsideBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container md:mt-12 mt-6 grid">
      <div className=" grid flex-1 gap-12 md:grid-cols-[200px_1fr] ">
        <aside className="hidden w-[200px] flex-col md:flex  border-r p-1">
          <SettingAsideBar />
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default layout;
