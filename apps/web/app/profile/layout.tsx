import React from "react";
import { Appbar } from "../../components/Appbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <main>{children}</main>
      <footer />
    </div>
  );
};

export default Layout;
