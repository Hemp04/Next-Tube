import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeNavbar } from "../components/home-navbar";
import { HomeSideBar } from "../components/home-sidebar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        {/* <p>Home Navbar</p> */}
        <div className="flex min-h-screen pt-16">
          <HomeNavbar />
          <main className="flex-1 overflow-y-auto ">
            <HomeSideBar/>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
// export default Layout;
