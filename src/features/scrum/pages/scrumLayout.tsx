import type { CSSProperties } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SCRUM_NAV_ITEMS, ScrumSidebar } from "../components/ScrumSidebar";

export const ScrumLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTitle =
    SCRUM_NAV_ITEMS.find((item) => item.path === location.pathname)?.title ??
    "Daily news";

  return (
    <SidebarProvider
      defaultOpen={false}
      style={{ "--sidebar-width": "13rem" } as CSSProperties}
    >
      <ScrumSidebar
        activePath={location.pathname}
        onSelectItem={(path) => navigate(path)}
      />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mx-1 h-4 w-px" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <span>Scrumify</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{activeTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
