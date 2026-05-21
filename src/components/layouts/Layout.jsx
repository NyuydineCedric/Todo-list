import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import "./Layout.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <TopNavbar />
      <main
        className={`main-content ${sidebarOpen ? "sidebar-visible" : "sidebar-hidden"}`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
