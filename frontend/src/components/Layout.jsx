import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="app-frame">
      <div className="relative flex min-h-screen">
        {showSidebar && <Sidebar />}

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar />

          <main className="shell-main">{children}</main>
        </div>
      </div>
    </div>
  );
};
export default Layout;
