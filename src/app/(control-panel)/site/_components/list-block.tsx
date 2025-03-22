"use client"

import { Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import type { Site } from "@/app/api/site/types"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { pathWithSlug } from "@/constants/path"

interface ListBlockProps {
  siteData: Site[]
}

export function ListBlock(props: ListBlockProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSites = props.siteData.filter(
    (site) =>
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleLink = (url: string) => {
    router.push(pathWithSlug.SITE_SLUG(url))
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Sites</h1>
        <div className="relative max-w-md">
          <Input
            type="text"
            placeholder="Search sites by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-background pr-10 focus-visible:ring-gray-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {filteredSites.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">
            No sites found matching your search criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSites.map((site) => (
            <Card
              key={site.name}
              className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-md"
              onClick={() => handleLink(site.site_id.toString())}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold group-hover:underline">
                  {site.name}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {site.short_description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {site.description}
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex w-full flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3.5 w-3.5" />
                    <span>
                      {new Date(site.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs font-normal">
                    Updated: {new Date(site.updated_at).toLocaleDateString()}
                  </Badge>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
