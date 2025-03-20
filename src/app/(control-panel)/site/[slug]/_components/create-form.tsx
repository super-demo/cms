"use client"

import { Loader2 } from "lucide-react"
import type React from "react"
import { useState } from "react"

import { CreateSiteUserWithoutSign } from "@/app/api/site-user/actions"
import type { Site } from "@/app/api/site/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreateFormProps {
  siteData: Site
}

export function CreateForm({ siteData }: CreateFormProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(false)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    try {
      await CreateSiteUserWithoutSign([
        {
          user_level_id: 4,
          site_id: siteData.site_id,
          email
        }
      ])
      setSuccess(true)
      setEmail("")
    } catch (err) {
      setError(`Failed to add user. ${err}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEmail("")
    setError("")
    setSuccess(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New User (Admin)</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isLoading ? "Adding..." : "Add User"}
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mt-4">
            <AlertDescription>User added successfully!</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
