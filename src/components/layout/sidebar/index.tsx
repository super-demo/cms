"use client"

import { Command } from "lucide-react"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar"

import { UserProfile } from "../../../app/api/user/types"
import { NavMain } from "./nav-main"
import { NavMockData } from "./nav-mock"
import { NavSecondary } from "./nav-secondary"
import { NavSupport } from "./nav-support"
import { NavUser } from "./nav-user"

interface SidebarLayoutProps extends React.ComponentProps<typeof Sidebar> {
  userData: UserProfile
}

export function SidebarLayout({ userData, ...props }: SidebarLayoutProps) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Template Inc.</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* FYI: This is mock components */}
        {/* TODO: Implement with navigation */}
        <NavMain items={NavMockData.navMain} />
        <NavSecondary items={NavMockData.navSecondary} />
        <NavSupport items={NavMockData.navSupport} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser userData={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
