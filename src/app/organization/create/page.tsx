"use client"

import { Pencil } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import { z } from "zod"

import { CreateOrganization } from "@/app/api/organization/actions"
import { OrganizationCreate } from "@/app/api/organization/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function Page() {
  const router = useRouter()
  const [formData, setFormData] = useState<OrganizationCreate>({
    name: "",
    description: "",
    image_url: ""
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const FormSchema = z.object({
    name: z.string().min(1, {
      message: "Name is required."
    }),
    description: z.string(),
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

  // TODO: Implement image upload
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      setFormData((prevData) => ({
        ...prevData,
        image_url: URL.createObjectURL(file)
      }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      FormSchema.parse(formData)
      const payload = {
        name: formData.name,
        description: formData.description,
        image_url: formData.image_url
      }

      await CreateOrganization(payload)

      router.push("/organization")
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

  function HandleCancel() {
    router.push("/organization")
  }

  return (
    <main className="bg-background p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              New Organization
            </h1>
            <p className="text-muted-foreground">
              Create a new organization to manage your projects and teams.
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr,300px]">
            <div className="space-y-4">
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
                  className={`w-full ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  The name of your organization. This will be displayed on your
                  profile and in search results.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">
                  Description
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
                  A description of your organization. This will be displayed on
                  your profile and in search results.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-base font-medium">Profile picture</Label>
                <div className="relative">
                  <div className="relative aspect-square overflow-hidden rounded-full">
                    <Image
                      width={200}
                      height={200}
                      src={
                        imagePreview ||
                        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=64&dpr=2&q=64"
                      }
                      alt="Profile"
                      className="h-full w-full bg-muted-foreground/10 object-cover"
                    />
                  </div>
                  <label
                    htmlFor="image-upload"
                    className="absolute bottom-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-background shadow-sm hover:bg-accent"
                  >
                    <Pencil className="h-4 w-4" />
                    <input
                      type="file"
                      id="image-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-start gap-2">
            <Button type="submit">Create</Button>
            <Button variant="outline" onClick={HandleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </main>
  )
}
