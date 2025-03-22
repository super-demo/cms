"use client"

import { AlertCircle, CheckCircle, Loader2, Plus, Tag } from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"

import { CreateSiteType } from "@/app/api/site-type/actions"
import type { SiteType } from "@/app/api/site-type/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

interface CreateFormProps {
  siteTypeData: SiteType[]
  onSuccess?: () => void
}

const validateType = (type: string, existingTypes: string[]) => {
  if (!type.trim()) {
    return "Type name cannot be empty"
  }
  if (type.length < 3) {
    return "Type name must be at least 3 characters long"
  }
  if (existingTypes.includes(type.toLowerCase())) {
    return "Type already exists"
  }
  if (!/^[a-zA-Z0-9-]+$/.test(type)) {
    return "Type name can only contain letters, numbers, and hyphens"
  }
  return null
}

export default function CreateForm({ siteTypeData }: CreateFormProps) {
  const router = useRouter()
  const [types, setTypes] = useState(
    siteTypeData.map((siteType) => siteType.slug.toLowerCase())
  )
  const [newType, setNewType] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleAddType = async () => {
    const validationError = validateType(newType, types)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      const newSiteType = {
        slug: newType.trim(),
        description: description.trim()
      }
      await CreateSiteType(newSiteType)
      setTypes([...types, newType.toLowerCase()])
      setSuccess(true)

      toast({
        title: "Success",
        description: `Type "${newType}" created successfully`,
        duration: 3000
      })

      // Reset form after successful creation
      setTimeout(() => {
        setNewType("")
        setDescription("")
        setSuccess(false)
        router.refresh()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      toast({
        title: "Error",
        description: "Failed to create site type",
        duration: 3000,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault()
      handleAddType()
    }
  }

  const handleCancel = () => {
    setNewType("")
    setDescription("")
    setError("")
    setSuccess(false)
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          <CardTitle>Create New Site Type</CardTitle>
        </div>
        <CardDescription>
          Add a new type to categorize your sites
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="type" className="text-base font-medium">
              Type Name <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="type"
                value={newType}
                onChange={(e) => {
                  setNewType(e.target.value)
                  setError("")
                }}
                onKeyDown={handleKeyPress}
                placeholder="e.g., blog, e-commerce, portfolio"
                className="pr-10"
                disabled={isLoading}
              />
              {newType && (
                <button
                  type="button"
                  onClick={() => setNewType("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear type"
                  tabIndex={-1}
                >
                  ×
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Must be at least 3 characters and contain only letters, numbers,
              and hyphens
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-medium">
              Description{" "}
              <span className="text-xs text-muted-foreground">(Optional)</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the purpose of this site type"
              className="min-h-[80px] resize-none"
              disabled={isLoading}
            />
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Site type {newType} has been created successfully.
            </AlertDescription>
          </Alert>
        )}

        <div className="rounded-md bg-muted p-4">
          <h3 className="mb-2 font-medium">Existing Types</h3>
          {types.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <div
                  key={type}
                  className="rounded-md bg-background px-3 py-1 text-sm font-medium shadow-sm ring-1 ring-inset ring-muted-foreground/20"
                >
                  {type}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No types created yet
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 border-t px-6 py-4">
        <Button variant="outline" disabled={isLoading} onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleAddType}
          disabled={isLoading || !newType.trim()}
          className="min-w-[120px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Create Type
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
