"use client"

import { Pencil } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { type ChangeEvent, type FormEvent, useState } from "react"
import { z } from "zod"

import type { SiteType } from "@/app/api/site-type/types"
import { CreateSite } from "@/app/api/site/actions"
import type { SiteForm } from "@/app/api/site/types"
import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { path } from "@/constants/path"

interface CreateFormProps {
  siteTypeData: SiteType[]
}

// Create a server action for image upload
async function uploadImage(formData: FormData) {
  try {
    // This will be executed on the server where Node.js modules are available
    const response = await fetch("/api/uploader", {
      method: "POST",
      body: formData
    })

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    const data = await response.json()
    return data.imageUrl
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

export function CreateForm(props: CreateFormProps) {
  const router = useRouter()

  const [siteTypeData] = useState<SiteType[]>(props.siteTypeData)
  const [formData, setFormData] = useState<SiteForm>({
    site_type_id: 1,
    name: "",
    description: "",
    short_description: "",
    image_url: ""
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isUploading, setIsUploading] = useState(false)

  const FormSchema = z.object({
    site_type_id: z.number().min(1, {
      message: "Please select a site type."
    }),
    name: z
      .string()
      .min(4, {
        message: "Name must be at least 4 characters long."
      })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "Name cannot contain special characters or spaces."
      }),
    description: z.string(),
    short_description: z.string(),
    image_url: z.string()
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }))
    }
  }

  const handleSiteTypeChange = (value: string) => {
    if (value === "more") {
      router.push(path.SITE_TYPE)
    } else {
      setFormData((prevData) => ({
        ...prevData,
        site_type_id: Number.parseInt(value)
      }))
    }
    if (errors.site_type_id) {
      setErrors((prevErrors) => ({ ...prevErrors, site_type_id: "" }))
    }
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      try {
        setIsUploading(true)
        const formData = new FormData()
        formData.append("file", file)

        // Call the server action to upload the image
        const imageUrl = await uploadImage(formData)

        setFormData((prevData) => ({
          ...prevData,
          image_url: imageUrl
        }))
      } catch (error) {
        console.error("Error uploading image:", error)
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Prevent submission if an image is still uploading
    if (isUploading) {
      setErrors({ image_url: "Please wait for image upload to complete" })
      return
    }

    try {
      FormSchema.parse(formData)
      const payload = {
        site_type_id: formData.site_type_id,
        name: formData.name,
        description: formData.description,
        short_description: formData.short_description,
        image_url: formData.image_url
      }

      await CreateSite(payload)
      router.push(path.SITE)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {}
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors(newErrors)
      }
    }
  }

  function handleCancel() {
    router.push(path.SITE)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create New Site
          </h1>
          <p className="text-muted-foreground">
            Create a new site to manage your projects and teams.
          </p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr,300px]">
          <div className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
              <p className="text-sm text-muted-foreground">
                The name of your site. This will be displayed on your profile
                and in search results.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="site_type_id" className="text-base font-medium">
                Type
              </Label>
              <Select
                value={formData.site_type_id.toString()}
                onValueChange={handleSiteTypeChange}
              >
                <SelectTrigger
                  className={errors.site_type_id ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select Site Type" />
                </SelectTrigger>
                <SelectContent>
                  {siteTypeData.map((type) => (
                    <SelectItem
                      key={type.site_type_id}
                      value={type.site_type_id.toString()}
                    >
                      {type.slug}
                    </SelectItem>
                  ))}

                  <SelectItem value="more" className="font-semibold">
                    + Add Site Type
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.site_type_id && (
                <p className="text-sm text-red-500">{errors.site_type_id}</p>
              )}
              <p className="text-sm text-muted-foreground">
                The type of your site. This will be used to categorize your
                site.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-medium">
                Description{" "}
                <span className="text-sm font-bold">(Optional)</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground">
                A description of your site. This will be displayed on your
                profile and in search results.
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="short_description"
                className="text-base font-medium"
              >
                Short Description{" "}
                <span className="text-sm font-bold">(Optional)</span>
              </Label>
              <Input
                type="text"
                id="short_description"
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                placeholder="Enter short description"
              />
              <p className="text-sm text-muted-foreground">
                A short description of your site. This will be displayed on your
                profile and in search results.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-base font-medium">
                Site Picture <br />
                <span className="text-sm font-bold">(Optional)</span>
              </Label>
              <div className="relative">
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    width={200}
                    height={200}
                    src={
                      imagePreview ||
                      "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=64&dpr=2&q=64" ||
                      "/placeholder.svg"
                    }
                    alt="Profile"
                    className={`h-full w-full bg-muted-foreground/10 object-cover ${isUploading ? "opacity-50" : ""}`}
                  />
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  )}
                </div>
                <label
                  htmlFor="image-upload"
                  className={`absolute bottom-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-background shadow-sm ${isUploading ? "cursor-not-allowed opacity-50" : "hover:bg-accent"}`}
                >
                  <Pencil className="h-4 w-4" />
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isUploading}
                  />
                </label>
              </div>
              {errors.image_url && (
                <p className="text-sm text-red-500">{errors.image_url}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-start gap-2">
          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Create"}
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isUploading}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  )
}
