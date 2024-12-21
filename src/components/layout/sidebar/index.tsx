"use client"

import { ComponentProps } from "react"

import { Organization } from "@/app/api/organization/types"
import { UserProfile } from "@/app/api/user/types"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar"

import { NavMain } from "./nav-main"
import { NavMockData } from "./nav-mock"
import { NavSecondary } from "./nav-secondary"
import { NavSupport } from "./nav-support"
import { NavUser } from "./nav-user"
import { OrganizationSwitcher } from "./organization-switcher"

interface SidebarLayoutProps extends ComponentProps<typeof Sidebar> {
  userData: UserProfile
  organizationData: Organization[]
}

export default function SidebarLayout({
  userData,
  organizationData,
  ...props
}: SidebarLayoutProps) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher organizationData={organizationData} />
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
