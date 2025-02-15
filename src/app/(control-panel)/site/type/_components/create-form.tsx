"use client"

import { Loader2, Plus } from "lucide-react"
import React, { useState } from "react"

import { CreateSiteType } from "@/app/api/site-type/actions"
import { SiteType } from "@/app/api/site-type/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

export default function CreateForm({
  siteTypeData,
  onSuccess
}: CreateFormProps) {
  const [types, setTypes] = useState(
    siteTypeData.map((siteType) => siteType.slug)
  )
  const [newType, setNewType] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAddType = async () => {
    const validationError = validateType(newType, types)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const newSiteType = {
        slug: newType,
        description: description
      }
      await CreateSiteType(newSiteType)
      setTypes([...types, newType])
      setNewType("")
      setDescription("")
      toast({
        title: "Success",
        description: "Type created successfully",
        duration: 1000
      })
      onSuccess?.()
      setTimeout(() => {
        window.location.reload()
      }, 1000)
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
    if (e.key === "Enter" && !isLoading) {
      handleAddType()
    }
  }

  const handleCancel = () => {
    setNewType("")
    setDescription("")
    setError("")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex w-1/2 flex-col space-y-2">
            <Label htmlFor="type" className="text-base font-medium">
              Type
            </Label>
            <Input
              id="type"
              value={newType}
              onChange={(e) => {
                setNewType(e.target.value)
                setError("")
              }}
              onKeyDown={handleKeyPress}
              placeholder="Enter type name"
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <div className="flex w-1/2 flex-col space-y-2">
            <Label htmlFor="description" className="text-base font-medium">
              Description <span className="text-sm font-bold">(Optional)</span>
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description (optional)"
              className="w-full"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <Button onClick={handleAddType} className="flex items-center">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Add Type
          </Button>
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => handleCancel()}
            className="flex items-center"
          >
            Cancel
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-4">
        <h3 className="mb-2 text-sm font-medium">Existing Types:</h3>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <div
              key={type}
              className="rounded-md bg-secondary px-3 py-1 text-sm text-secondary-foreground"
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
