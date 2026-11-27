import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BellIcon,
  CalendarIcon,
  ChevronDownIcon,
  CirclePlayIcon,
  Columns3Icon,
  LayoutGridIcon,
  LayersIcon,
  ListIcon,
  ListTodoIcon,
  PlusIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export const getProjectSectionTitleKey = (
  pathname: string,
  projectId: string,
) => {
  const basePath = `/projects/${projectId}`;

  if (pathname === `${basePath}/pbis`) {
    return "projectNav.allPbis" as const;
  }
  if (pathname === `${basePath}/tasks`) {
    return "projectNav.allTasks" as const;
  }
  if (pathname === `${basePath}/epics`) {
    return "projectNav.epics" as const;
  }
  if (pathname === `${basePath}/sprints/active`) {
    return "projectNav.activeSprint" as const;
  }
  if (pathname === `${basePath}/sprints`) {
    return "projectNav.allSprints" as const;
  }

  return "projectNav.overview" as const;
};

type ProjectSidebarProps = {
  projectId: string;
  activePath: string;
  hasActiveSprint?: boolean;
  onSelectItem: (path: string) => void;
  onBackToProjects: () => void;
};

export const ProjectSidebar = ({
  projectId,
  activePath,
  hasActiveSprint,
  onSelectItem,
  onBackToProjects,
}: ProjectSidebarProps) => {
  const { t } = useTranslation();
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;

  const [isBacklogOpen, setIsBacklogOpen] = useState(true);
  const [isSprintsOpen, setIsSprintsOpen] = useState(true);

  const basePath = `/projects/${projectId}`;

  const backlogItems = [
    {
      title: t("projectNav.allPbis"),
      path: `${basePath}/pbis`,
      icon: ListIcon,
    },
    {
      title: t("projectNav.allTasks"),
      path: `${basePath}/tasks`,
      icon: ListTodoIcon,
    },
    {
      title: t("projectNav.epics"),
      path: `${basePath}/epics`,
      icon: LayersIcon,
    },
  ];

  const sprintItems = [
    {
      title: t("projectNav.activeSprint"),
      path: `${basePath}/sprints/active`,
      icon: CirclePlayIcon,
      hasDot: hasActiveSprint,
    },
    {
      title: t("projectNav.allSprints"),
      path: `${basePath}/sprints`,
      icon: Columns3Icon,
    },
  ];

  const collapsedNavItems: Array<{
    title: string;
    path: string;
    icon: typeof LayoutGridIcon;
    hasDot?: boolean;
  }> = [
    {
      title: t("projectNav.overview"),
      path: basePath,
      icon: LayoutGridIcon,
    },
    ...backlogItems,
    ...sprintItems,
  ];

  return (
    <Sidebar collapsible="icon">
      {isCollapsed ? (
        <>
          <SidebarHeader className="border-b border-border px-0 py-3">
            <div className="flex flex-col items-center gap-2.5">
              <button
                type="button"
                onClick={onBackToProjects}
                title={t("projectNav.backToProjects")}
                aria-label={t("projectNav.backToProjects")}
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-white/[0.04] text-foreground transition-colors hover:bg-white/[0.08]"
              >
                <LayersIcon className="size-4" />
              </button>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={t("common.new")}
                title={`${t("common.new")} (C)`}
                className="size-8 rounded-lg border border-border bg-white/[0.06] text-foreground hover:bg-white/[0.1]"
              >
                <PlusIcon className="size-4" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={t("projectNav.notifications")}
                title={t("projectNav.notifications")}
                className="relative size-8 text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
              >
                <BellIcon className="size-4" />
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-indigo-400"
                />
              </Button>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-0 py-3">
            <SidebarMenu className="items-center gap-1.5">
              {collapsedNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePath === item.path;

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActive}
                      onClick={() => onSelectItem(item.path)}
                      className="relative justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground data-active:bg-white/[0.08] data-active:text-foreground"
                    >
                      <Icon className="size-4" />
                      {item.hasDot && (
                        <span
                          aria-hidden="true"
                          className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-sky-400"
                        />
                      )}
                      <span className="sr-only">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
        </>
      ) : (
        <>
          <SidebarHeader className="border-b border-white/[0.06] px-3 py-3">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={onBackToProjects}
                title={t("projectNav.backToProjects")}
                className="flex items-center gap-2.5 rounded-lg px-1 py-0.5 text-left transition-colors hover:bg-white/[0.04]"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/15 text-info">
                  <LayersIcon className="size-4" />
                </div>
                <span className="truncate text-sm font-semibold text-foreground">
                  {t("common.appName")}
                </span>
              </button>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={t("projectNav.notifications")}
                className="relative text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
              >
                <BellIcon className="size-4" />
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-sky-400"
                />
              </Button>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2 py-3">
            <div className="px-1 pb-3">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-border bg-white/[0.03] px-3 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-white/[0.06]"
              >
                <span className="flex items-center gap-2">
                  <PlusIcon className="size-4 shrink-0 text-foreground-secondary" />
                  <span>{t("common.new")}</span>
                </span>
                <kbd className="rounded border border-border bg-white/[0.04] px-1.5 py-0.5 font-mono text-[11px] leading-none text-muted-foreground">
                  C
                </kbd>
              </button>
            </div>

            <SidebarGroup className="px-1 py-0">
              <SidebarGroupLabel className="px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                {t("projectNav.workspace")}
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip={t("projectNav.overview")}
                      isActive={activePath === basePath}
                      onClick={() => onSelectItem(basePath)}
                      className="rounded-lg text-[13px] font-medium text-foreground-subtle transition-colors hover:bg-white/[0.04] hover:text-foreground data-active:border data-active:border-border data-active:bg-white/[0.07] data-active:text-foreground"
                    >
                      <LayoutGridIcon
                        className={cn(
                          "size-4",
                          activePath === basePath
                            ? "text-info"
                            : "text-muted-foreground",
                        )}
                      />
                      <span>{t("projectNav.overview")}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip={t("projectNav.productBacklog")}
                      onClick={() => setIsBacklogOpen((prev) => !prev)}
                      className="rounded-lg text-[13px] font-medium text-foreground-secondary transition-colors hover:bg-white/[0.04] hover:text-foreground"
                    >
                      <SlidersHorizontalIcon className="size-4 text-muted-foreground" />
                      <span>{t("projectNav.productBacklog")}</span>
                      <ChevronDownIcon
                        className={cn(
                          "ml-auto size-4 text-muted-foreground transition-transform duration-200",
                          !isBacklogOpen && "-rotate-90",
                        )}
                      />
                    </SidebarMenuButton>

                    {isBacklogOpen && (
                      <SidebarMenuSub className="mt-1 border-border py-0.5">
                        {backlogItems.map((item) => {
                          const Icon = item.icon;
                          const isActive = activePath === item.path;

                          return (
                            <SidebarMenuSubItem key={item.path}>
                              <SidebarMenuSubButton
                                render={<button type="button" />}
                                isActive={isActive}
                                onClick={() => onSelectItem(item.path)}
                                className="h-8 w-full cursor-pointer rounded-md px-2.5 text-[13px] text-foreground-subtle transition-colors hover:bg-white/[0.04] hover:text-foreground data-active:bg-white/[0.07] data-active:text-foreground"
                              >
                                <Icon
                                  className={cn(
                                    "size-4",
                                    isActive
                                      ? "text-info"
                                      : "text-muted-foreground",
                                  )}
                                />
                                <span>{item.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip={t("projectNav.sprints")}
                      onClick={() => setIsSprintsOpen((prev) => !prev)}
                      className="rounded-lg text-[13px] font-medium text-foreground-secondary transition-colors hover:bg-white/[0.04] hover:text-foreground"
                    >
                      <CalendarIcon className="size-4 text-muted-foreground" />
                      <span>{t("projectNav.sprints")}</span>
                      <ChevronDownIcon
                        className={cn(
                          "ml-auto size-4 text-muted-foreground transition-transform duration-200",
                          !isSprintsOpen && "-rotate-90",
                        )}
                      />
                    </SidebarMenuButton>

                    {isSprintsOpen && (
                      <SidebarMenuSub className="mt-1 border-border py-0.5">
                        {sprintItems.map((item) => {
                          const Icon = item.icon;
                          const isActive = activePath === item.path;

                          return (
                            <SidebarMenuSubItem key={item.path}>
                              <SidebarMenuSubButton
                                render={<button type="button" />}
                                isActive={isActive}
                                onClick={() => onSelectItem(item.path)}
                                className="h-8 w-full cursor-pointer rounded-md px-2.5 text-[13px] text-foreground-subtle transition-colors hover:bg-white/[0.04] hover:text-foreground data-active:bg-white/[0.07] data-active:text-foreground"
                              >
                                <Icon
                                  className={cn(
                                    "size-4",
                                    isActive
                                      ? "text-info"
                                      : "text-muted-foreground",
                                  )}
                                />
                                <span>{item.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </>
      )}

      <SidebarRail />
    </Sidebar>
  );
};
