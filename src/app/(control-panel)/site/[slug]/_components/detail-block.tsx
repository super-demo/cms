"use client"

import { Calendar, Globe, ImageIcon, User } from "lucide-react"
import Image from "next/image"

import type { Site } from "@/app/api/site/types"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface SiteDetailProps {
  site: Site
}

export function DetailBlock({ site }: SiteDetailProps) {
  return (
    <Card className="overflow-hidden border-2">
      {site.image_url && (
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={site.image_url || "/placeholder.svg"}
            alt={`${site.name} thumbnail`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none"
            }}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-2xl font-bold tracking-tight">
                {site.name}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-xs">
                ID: {site.site_id}
              </Badge>
            </div>
            <CardDescription className="mt-1 text-base">
              {site.short_description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="w-fit shrink-0">
            Type: {site.site_type_id}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">
            Description
          </h2>
          <div className="rounded-md bg-muted/40 p-4 text-muted-foreground">
            <p>{site.description}</p>
          </div>
        </section>

        <Separator className="my-6" />

        <div className="grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="mb-3 text-lg font-semibold tracking-tight">Links</h2>
            <ul className="space-y-3 rounded-md border p-4">
              <li className="group flex items-center space-x-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-all hover:font-medium hover:underline"
                >
                  Visit Website
                </a>
              </li>
              {site.image_url && (
                <li className="group flex items-center space-x-3">
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  <a
                    href={site.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground transition-all hover:font-medium hover:underline"
                  >
                    View Full Image
                  </a>
                </li>
              )}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold tracking-tight">
              Timeline
            </h2>
            <div className="space-y-4 rounded-md border p-4">
              <div className="flex items-start gap-3">
                <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Created by</p>
                  <p className="text-sm text-muted-foreground">
                    {site.created_by?.name || "Unknown"} on{" "}
                    {new Date(site.created_at).toLocaleDateString()} at{" "}
                    {new Date(site.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Last updated</p>
                  <p className="text-sm text-muted-foreground">
                    {site.updated_by?.name || "Unknown"} on{" "}
                    {new Date(site.updated_at).toLocaleDateString()} at{" "}
                    {new Date(site.updated_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </CardContent>
    </Card>
  )
}
