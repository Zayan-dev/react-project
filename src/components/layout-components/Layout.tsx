import { Image } from "@heroui/react";
import mindsetLogo from "../../assets/mindset-logo.png";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-base-gray text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-base-darkGray p-4 flex flex-col">
        <Image className="rounded-none p-2" src={mindsetLogo} />
        <nav className="flex flex-col gap-3 mt-5">
          <a href="#" className="hover:text-base-orange">
            Users
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="h-16 bg-base-darkGray px-6 flex items-center justify-between shadow">
          <h1 className="text-xl font-semibold">Header</h1>
          <div className="flex items-center gap-4">
            <button className="hover:text-base-orange">Notifications</button>
            <button className="hover:text-base-orange">Logout</button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6  overflow-y-auto">
          {<Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
