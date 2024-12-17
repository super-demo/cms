"use client"

import { ChevronDown, Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Organization } from "@/app/api/organization/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import ShortnameImage from "@/lib/shortname-image"

interface OrganizationSwitcherProps {
  organizationData: Organization[]
}

export function OrganizationSwitcher(props: OrganizationSwitcherProps) {
  const [activeOrganization, setActiveOrganization] = useState(
    props.organizationData[0] || null
  )

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5">
              {activeOrganization ? (
                <>
                  <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground"></div>
                  <span className="truncate font-semibold">
                    {activeOrganization.name}
                  </span>
                  <ChevronDown className="opacity-50" />
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="size-4" />
                  <span className="truncate font-medium text-muted-foreground">
                    New Organization
                  </span>
                </div>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            {props.organizationData.length > 0 ? (
              <>
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Organization
                </DropdownMenuLabel>
                {props.organizationData.map((organization, index) => (
                  <DropdownMenuItem
                    key={organization.name}
                    onClick={() => setActiveOrganization(organization)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <Avatar className="size-6 rounded-lg">
                        <AvatarImage
                          src={organization.imageUrl}
                          alt={organization.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          {ShortnameImage(organization.name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    {organization.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </>
            ) : null}
            <DropdownMenuItem className="gap-2 p-2" asChild>
              <Link href="/organization/create">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  New Organization
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}