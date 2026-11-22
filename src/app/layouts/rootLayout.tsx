import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toast";

export function RootLayout() {
  return (
    <Toaster>
      <div className="min-h-screen bg-background text-foreground">
        <Outlet />
      </div>
    </Toaster>
  );
}
