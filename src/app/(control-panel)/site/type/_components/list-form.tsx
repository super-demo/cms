"use client"

import { Trash2 } from "lucide-react"
import { useState } from "react"

import { DeleteSiteType } from "@/app/api/site-type/actions"
import { SiteType } from "@/app/api/site-type/types"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface ListFormProps {
  siteTypeData: SiteType[]
  onSuccess?: () => void
}

export function ListForm(props: ListFormProps) {
  const [types, setTypes] = useState(
    props.siteTypeData.map((siteType) => ({
      slug: siteType.slug,
      description: siteType.description
    }))
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleDelete = async (index: number): Promise<void> => {
    setIsLoading(true)
    setError("")

    try {
      const siteTypeToDelete = props.siteTypeData.find(
        (siteType) => siteType.slug === types[index].slug
      )
      if (siteTypeToDelete) {
        await DeleteSiteType(siteTypeToDelete)
      }
      const newTypes = types.filter((_, i: number) => i !== index)
      setTypes(newTypes)
      toast({
        title: "Success",
        description: "Type deleted successfully",
        duration: 1000
      })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      toast({
        description: "Failed to delete site type: " + error,
        duration: 3000,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight">List of Types</h2>
      <ul className="my-3 grid gap-4">
        {types.map((type, index) => (
          <li
            key={index}
            className="overflow-hidden rounded-lg bg-white shadow"
          >
            <div className="flex items-center justify-between p-4">
              <div>
                <span className="text-lg font-medium text-gray-900">
                  {type.slug}
                </span>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => handleDelete(index)}
                  size="sm"
                  variant="outline"
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
