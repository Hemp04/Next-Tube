import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeNavbar } from "../components/home-navbar";
import { HomeSideBar } from "../components/home-sidebar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full min-h-screen flex flex-col pt-16">
        {/* Navbar at top */}
        <HomeNavbar />

        {/* Sidebar + main content */}
        <div className="flex flex-1">
          <HomeSideBar />

          {/* Main content area */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
// export default Layout;
