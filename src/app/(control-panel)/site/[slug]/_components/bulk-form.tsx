"use client"

import {
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Loader2,
  Upload,
  X
} from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"

import { BulkImportUserWithoutSign } from "@/app/api/site-user/actions"
import type { Site } from "@/app/api/site/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface BulkFormProps {
  siteData: Site
  onSuccess?: () => void
  dialog?: boolean
}

export function BulkForm({
  siteData,
  onSuccess,
  dialog = false
}: BulkFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
        setError("Please upload a CSV or XLSX file")
        setSelectedFile(null)
        return
      }
      setSelectedFile(file)
      setError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      setError("Please select a file to upload")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      await BulkImportUserWithoutSign(siteData.site_id, formData)

      setSuccess(true)
      setSelectedFile(null)
      if (e.target instanceof HTMLFormElement) {
        e.target.reset()
      }

      toast({
        title: "Users imported successfully",
        description: `Users from ${selectedFile.name} have been added to ${siteData.name}`
      })

      router.refresh()
      if (onSuccess) onSuccess()
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to import users"
      )
      toast({
        variant: "destructive",
        title: "Import failed",
        description:
          error instanceof Error ? error.message : "Failed to import users"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setError("")
    setSuccess(false)
    if (onSuccess) onSuccess()
  }

  const content = (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file" className="flex items-center gap-1.5">
            <FileSpreadsheet className="h-3.5 w-3.5" />
            Upload CSV or XLSX File
          </Label>
          <div className="rounded-md border border-dashed p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Drag and drop your file here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports CSV and XLSX files with user data
              </p>
            </div>
            <Input
              id="file"
              type="file"
              accept=".csv, .xlsx"
              onChange={handleFileChange}
              className="mt-4 cursor-pointer"
            />
          </div>
          {selectedFile && (
            <div className="flex items-center gap-2 rounded-md bg-muted p-2 text-sm">
              {selectedFile.name.endsWith(".csv") ? (
                <FileText className="h-4 w-4 text-muted-foreground" />
              ) : (
                <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="font-medium">{selectedFile.name}</span>
              <span className="text-xs text-muted-foreground">
                ({(selectedFile.size / 1024).toFixed(1)} KB)
              </span>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="ml-auto text-muted-foreground hover:text-foreground"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>

        <div className="rounded-md bg-muted/40 p-3">
          <h3 className="mb-1 text-sm font-medium">File Format Requirements</h3>
          <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground">
            <li>First row must contain column headers</li>
            <li>Required columns: email, name (optional)</li>
            <li>Maximum 500 users per import</li>
          </ul>
        </div>

        {dialog ? (
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedFile || isLoading}
              className="min-w-[100px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </>
              )}
            </Button>
          </div>
        ) : (
          <Button
            type="submit"
            disabled={!selectedFile || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Import Users
              </>
            )}
          </Button>
        )}
      </form>

      {success && !dialog && (
        <Alert className="mt-4 border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Users have been imported successfully.
          </AlertDescription>
        </Alert>
      )}
    </>
  )

  if (dialog) {
    return content
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          <CardTitle>Bulk Import Users</CardTitle>
        </div>
        <CardDescription>
          Import multiple users at once via CSV or XLSX file
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">{content}</CardContent>
    </Card>
  )
}

// Add these components to make the component work
