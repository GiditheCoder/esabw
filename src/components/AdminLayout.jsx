import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, ImageIcon, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin-dashboard",
    },
    {
      title: "Gallery",
      icon: ImageIcon,
      path: "/admin-dashboard/galleries",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <SidebarProvider>
      <Sidebar className="bg-[#041725] text-white border-r border-white/10">
        <SidebarHeader className="border-b border-white/10 px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-lg text-white">Admin Panel</span>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2 py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`transition-all duration-200 ${
                          isActive
                            ? "bg-[#0093FF] text-white hover:bg-[#0093FF] hover:text-white"
                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <button
                          onClick={() => navigate(item.path)}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg"
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-white/10 p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="overflow-x-hidden">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 md:hidden">
          <SidebarTrigger />
          <span className="font-semibold">Admin Panel</span>
        </header>
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
