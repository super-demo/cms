"use client"

import {
  CheckCircle2,
  Loader2,
  Mail,
  UserCog,
  UserPlus,
  XCircle
} from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"

import { CreateSiteUserWithoutSign } from "@/app/api/site-user/actions"
import type { Site } from "@/app/api/site/types"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface CreateFormProps {
  siteData: Site
  onSuccess?: () => void
  dialog?: boolean
}

export function CreateForm({
  siteData,
  onSuccess,
  dialog = false
}: CreateFormProps) {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("4") // Default to Viewer (4)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Validate email as user types
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setIsValid(emailRegex.test(email))
    if (email && !emailRegex.test(email)) {
      setError("Please enter a valid email address")
    } else {
      setError("")
    }
  }, [email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValid) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      await CreateSiteUserWithoutSign([
        {
          user_level_id: Number.parseInt(role),
          site_id: siteData.site_id,
          email
        }
      ])

      setSuccess(true)
      setEmail("")

      toast({
        title: "User added successfully",
        description: `Invitation sent to ${email}`
      })

      router.refresh()
      if (onSuccess) onSuccess()
    } catch (err) {
      setError(
        `Failed to add user: ${err instanceof Error ? err.message : String(err)}`
      )
      toast({
        variant: "destructive",
        title: "Failed to add user",
        description: err instanceof Error ? err.message : String(err)
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEmail("")
    setError("")
    setSuccess(false)
    if (onSuccess) onSuccess()
  }

  const content = (
    <>
      <form id="add-user-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            Email Address
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`pr-10 ${error && email ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
              disabled={isLoading}
              aria-invalid={!!error}
              aria-describedby={error ? "email-error" : undefined}
            />
            {email && (
              <button
                type="button"
                onClick={() => setEmail("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear email"
                tabIndex={-1}
              >
                ×
              </button>
            )}
          </div>
          {error && email && (
            <p id="email-error" className="text-xs text-destructive">
              {error}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="flex items-center gap-1.5">
            <UserCog className="h-3.5 w-3.5" />
            User Role
          </Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">Admin</SelectItem>
              <SelectItem value="3">Editor</SelectItem>
              <SelectItem value="4">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {role === "2"
              ? "Full access to manage site and users"
              : role === "3"
                ? "Can edit content but not manage users"
                : "View-only access to site content"}
          </p>
        </div>

        {dialog ? (
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !email || !!error}
              className="min-w-[100px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add User"
              )}
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading || (!email && !error && !success)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="add-user-form"
              disabled={isLoading || !email || !!error}
              className="min-w-[100px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add User"
              )}
            </Button>
          </div>
        )}
      </form>

      {success && !dialog && (
        <Alert className="mt-6 border-2 border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            User with email{" "}
            <span className="font-medium">{email || "the provided email"}</span>{" "}
            has been added to {siteData.name}.
          </AlertDescription>
        </Alert>
      )}

      {error && !email && !dialog && (
        <Alert variant="destructive" className="mt-6">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
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
          <UserPlus className="h-5 w-5" />
          <CardTitle>Add New User</CardTitle>
        </div>
        <CardDescription>
          Grant access to {siteData.name} for a new user by email
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">{content}</CardContent>

      <CardFooter className="flex justify-between gap-2 border-t px-6 py-4">
        <div className="text-xs text-muted-foreground">
          User will receive an email invitation
        </div>
      </CardFooter>
    </Card>
  )
}

// Add this component to make the component work
