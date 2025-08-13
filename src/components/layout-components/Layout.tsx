import React, { useState } from "react";
import {
  Image,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Badge,
} from "@heroui/react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Home,
  Users,
  BarChart3,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import mindsetLogo from "../../assets/mindset-logo.png";
import Cookies from "js-cookie";
import { useLogout } from "../../services/auth";
const Layout: React.FC = () => {
  const { setIsAuthenticated } = useAuth();
  const { mutate } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      href: "/home",
      icon: Home,
      current: location.pathname === "/home",
    },
    {
      name: "Users",
      href: "/users",
      icon: Users,
      current: location.pathname === "/users",
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      current: location.pathname === "/analytics",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      current: location.pathname === "/settings",
    },
  ];

  const handleLogout = async () => {
    mutate();
    Cookies.remove("access-token");
    Cookies.remove("refresh-token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              <Image src={mindsetLogo} alt="Mindset Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-900">Mindset</span>
            </div>
            <Button
              isIconOnly
              variant="light"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      item.current
                        ? "bg-base-orange text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      item.current ? "text-white" : "text-gray-500"
                    }`}
                  />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex-shrink-0">
          <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <Button
              isIconOnly
              variant="light"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Page title */}
            <div className="flex-1 lg:flex-none">
              <h1 className="text-lg font-semibold text-gray-900">
                {navigation.find((item) => item.current)?.name || "Dashboard"}
              </h1>
            </div>

            {/* Header actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button isIconOnly variant="light" className="relative">
                <Bell className="w-5 h-5" />
                <Badge
                  color="danger"
                  size="sm"
                  className="absolute -top-1 -right-1"
                >
                  3
                </Badge>
              </Button>

              {/* User dropdown */}
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    variant="light"
                    className="flex items-center space-x-2 px-3 py-2"
                  >
                    <Avatar name={"User"} className="w-8 h-8 text-sm" />
                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                      {"User"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="User actions">
                  <DropdownItem
                    key="profile"
                    startContent={<User className="w-4 h-4" />}
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    key="settings"
                    startContent={<Settings className="w-4 h-4" />}
                  >
                    Settings
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    startContent={<LogOut className="w-4 h-4" />}
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
