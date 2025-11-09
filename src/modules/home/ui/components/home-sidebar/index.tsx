import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { MainSection } from "./main-section";
import { Separator } from "@/components/ui/separator";
import { PersonalSection } from "./personal-section";

export const HomeSideBar = () => {
  return (
    // <SidebarProvider>        
      <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
        <SidebarContent className="bg-background">
          <MainSection />
          <Separator />
          <PersonalSection />
        </SidebarContent>
      </Sidebar>
    // </SidebarProvider>
  );
};
