"use client"

import { Calendar, Globe } from "lucide-react"
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

interface ListBlockProps {
  siteData: Site[]
}

export function ListBlock(props: ListBlockProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSites = props.siteData.filter(
    (site) =>
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-bold">Site</h1>
        <Input
          type="text"
          placeholder="Search sites by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {filteredSites.length === 0 ? (
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            No sites found matching your search criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSites.map((site) => (
            <Card
              key={site.name}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold">{site.name}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {site.short_description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600">{site.description}</p>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Visit Site
                  </a>
                </div>
              </CardContent>
              <CardFooter className="">
                <div className="flex w-full flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    Created: {new Date(site.created_at).toLocaleDateString()}
                  </div>
                  <Badge variant="outline" className="bg-white">
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
