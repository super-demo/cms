"use client"

import { Calendar, Globe, ImageIcon } from "lucide-react"

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
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <div>
              <CardTitle className="text-2xl font-bold">{site.name}</CardTitle>
              <CardDescription>{site.short_description}</CardDescription>
            </div>
            <Badge className="mt-1">ID: {site.site_id}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="mb-2 text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground">{site.description}</p>
          </section>

          <Separator />

          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h2 className="text-lg font-semibold">Site Details</h2>
                <Badge variant="outline">Type ID: {site.site_type_id}</Badge>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Visit Site
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <ImageIcon className="h-4 w-4" />
                  <a
                    href={site.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View Image
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-semibold">Timeline</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Created: {new Date(site.created_at).toLocaleString()}
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Updated: {new Date(site.updated_at).toLocaleString()}
                  </span>
                </li>
              </ul>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
