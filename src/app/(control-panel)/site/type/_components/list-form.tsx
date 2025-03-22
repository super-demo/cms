"use client"

import { Edit2, Loader2, Search, Tag, Trash2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { DeleteSiteType } from "@/app/api/site-type/actions"
import type { SiteType } from "@/app/api/site-type/types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"

interface ListFormProps {
  siteTypeData: SiteType[]
  onSuccess?: () => void
}

export function ListForm(props: ListFormProps) {
  const router = useRouter()
  const [types, setTypes] = useState(props.siteTypeData)
  const [filteredTypes, setFilteredTypes] = useState(props.siteTypeData)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState<number | null>(null)
  const [, setError] = useState("")

  useEffect(() => {
    if (searchTerm) {
      const filtered = types.filter(
        (type) =>
          type.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (type.description &&
            type.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredTypes(filtered)
    } else {
      setFilteredTypes(types)
    }
  }, [searchTerm, types])

  const handleDelete = async (
    siteType: SiteType,
    index: number
  ): Promise<void> => {
    setIsLoading(index)
    setError("")

    try {
      await DeleteSiteType(siteType)

      const newTypes = types.filter((type) => type.slug !== siteType.slug)
      setTypes(newTypes)

      toast({
        title: "Type deleted",
        description: `"${siteType.slug}" has been removed successfully`,
        duration: 3000
      })

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      toast({
        title: "Error",
        description:
          "Failed to delete site type: " +
          (err instanceof Error ? err.message : "Unknown error"),
        duration: 3000,
        variant: "destructive"
      })
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            <CardTitle>Site Types</CardTitle>
          </div>
          <div className="relative w-[240px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <CardDescription>
          Manage the types used to categorize sites
        </CardDescription>
      </CardHeader>

      <CardContent>
        {filteredTypes.length === 0 ? (
          <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
            <Tag className="mb-2 h-8 w-8 text-muted-foreground" />
            <h3 className="mb-1 text-lg font-medium">No types found</h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm
                ? "No types match your search criteria"
                : "Start by creating your first site type"}
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[100px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTypes.map((type, index) => (
                  <TableRow key={type.slug}>
                    <TableCell className="font-medium">{type.slug}</TableCell>
                    <TableCell>
                      {type.description || (
                        <span className="italic text-muted-foreground">
                          No description
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            // In a real app, you would navigate to an edit page or open a modal
                            toast({
                              title: "Edit functionality",
                              description:
                                "Edit functionality would be implemented here"
                            })
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Site Type
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the {type.slug}
                                type? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(type, index)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {isLoading === index ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                  </>
                                ) : (
                                  "Delete"
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
