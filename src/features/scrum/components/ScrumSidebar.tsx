import { useTranslation } from "react-i18next";
import {
  CircleUserIcon,
  LogOutIcon,
  MoreHorizontalIcon,
  SlidersHorizontalIcon,
  UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useLogout } from "@/features/auth";
import folderIcon from "@/components/icons/akar-icons--folder.svg?raw";
import questionIcon from "@/components/icons/akar-icons--question.svg?raw";
import newsIcon from "@/components/icons/news.svg?raw";

export const SCRUM_NAV_ITEMS = [
  {
    titleKey: "nav.dailyNews" as const,
    path: "/",
    icon: newsIcon,
  },
  {
    titleKey: "nav.projects" as const,
    path: "/projects",
    icon: folderIcon,
  },
  {
    titleKey: "nav.supports" as const,
    path: "/supports",
    icon: questionIcon,
  },
] as const;

type ScrumSidebarProps = {
  activePath: string;
  onSelectItem: (path: string) => void;
};

export const ScrumSidebar = ({
  activePath,
  onSelectItem,
}: ScrumSidebarProps) => {
  const { t } = useTranslation();
  const logoutMutation = useLogout();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-3">
        <div className="flex items-center gap-2.5 px-2.5 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#6366f1] text-xs font-semibold text-white">
            S
          </div>
          <span className="truncate text-sm font-semibold text-white group-data-[collapsible=icon]:hidden">
            Scrumify
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SCRUM_NAV_ITEMS.map((item) => {
                const label = t(item.titleKey);

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      tooltip={label}
                      isActive={item.path === activePath}
                      onClick={() => onSelectItem(item.path)}
                      className="rounded-lg text-[13px] font-medium text-[#8a8b98] transition-colors hover:bg-white/[0.04] hover:text-white data-active:bg-white/[0.07] data-active:text-white"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4"
                        dangerouslySetInnerHTML={{ __html: item.icon }}
                      />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/[0.06] p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="rounded-lg hover:bg-white/[0.04] data-[popup-open]:bg-white/[0.07] data-[popup-open]:text-white"
                  />
                }
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#232429] text-[#8a8b98]">
                  <UserIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate text-[13px] font-medium text-white">
                    Sinh nguyen
                  </span>
                  <span className="truncate text-[11px] text-[#8a8b98]">
                    Lead Engineer • Admin
                  </span>
                </div>
                <MoreHorizontalIcon className="ml-auto size-4 text-[#8a8b98] group-data-[collapsible=icon]:hidden" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="right"
                align="end"
                sideOffset={12}
                className="w-56 rounded-xl border border-white/10 bg-[#1b1c22] p-1.5 shadow-2xl"
              >
                <div className="px-2.5 py-1.5">
                  <p className="truncate text-[13px] font-medium text-white">
                    Sinh nguyen
                  </p>
                  <p className="truncate font-mono text-xs text-[#8a8b98]">
                    sinh.nguyen@work.io
                  </p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] text-[#d4d4d8] focus:bg-white/[0.06] focus:text-white">
                  <CircleUserIcon className="size-4 text-[#6366f1]" />
                  <span>{t("nav.profile")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] text-[#d4d4d8] focus:bg-white/[0.06] focus:text-white">
                  <SlidersHorizontalIcon className="size-4 text-[#8a8b98]" />
                  <span>{t("nav.settings")}</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  variant="destructive"
                  disabled={logoutMutation.isPending}
                  onClick={() => logoutMutation.mutate()}
                  className="gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] text-red-400 focus:bg-red-500/10 focus:text-red-400"
                >
                  <LogOutIcon className="size-4" />
                  <span>{t("nav.logOut")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
