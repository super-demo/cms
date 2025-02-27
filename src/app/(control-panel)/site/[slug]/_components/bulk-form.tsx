// "use client"

// import { Upload } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useState } from "react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// import { useToast } from "../../../../../hooks/use-toast"
// import { BulkImportUserWithoutSign } from "../../../../api/site-user/actions"
// import { Site } from "../../../../api/site/types"

// interface BulkFormProps {
//   siteData: Site
// }

// export function BulkForm({ siteData }: BulkFormProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const { toast } = useToast()
//   const router = useRouter()

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       // Check if file is CSV or XLSX
//       if (!file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
//         toast({
//           variant: "destructive",
//           title: "Invalid file type",
//           description: "Please upload a CSV or XLSX file"
//         })
//         return
//       }
//       setSelectedFile(file)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!selectedFile) {
//       toast({
//         variant: "destructive",
//         title: "No file selected",
//         description: "Please select a file to upload"
//       })
//       return
//     }

//     setIsLoading(true)

//     try {
//       const formData = new FormData()
//       formData.append("file", selectedFile)

//       await BulkImportUserWithoutSign(siteData.site_id, formData)

//       toast({
//         title: "Success",
//         description: "Users imported successfully"
//       })

//       // Reset form
//       setSelectedFile(null)
//       if (e.target instanceof HTMLFormElement) {
//         e.target.reset()
//       }

//       // Optionally refresh the page or redirect
//       router.refresh()
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description:
//           error instanceof Error ? error.message : "Failed to import users"
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Card className="mx-auto w-full max-w-md">
//       <CardHeader>
//         <CardTitle>Bulk Import Users</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="file">Upload CSV File</Label>
//             <div className="flex items-center gap-2">
//               <Input
//                 id="file"
//                 type="file"
//                 accept=".csv, .xlsx"
//                 onChange={handleFileChange}
//                 className="flex-1"
//               />
//             </div>
//             {selectedFile && (
//               <p className="text-sm text-gray-500">
//                 Selected: {selectedFile.name}
//               </p>
//             )}
//           </div>

//           <Button
//             type="submit"
//             disabled={!selectedFile || isLoading}
//             className="w-full"
//           >
//             {isLoading ? (
//               <span className="flex items-center gap-2">
//                 <Upload className="h-4 w-4 animate-spin" />
//                 Importing...
//               </span>
//             ) : (
//               <span className="flex items-center gap-2">
//                 <Upload className="h-4 w-4" />
//                 Import Users
//               </span>
//             )}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"

import { BulkImportUserWithoutSign } from "@/app/api/site-user/actions"
import type { Site } from "@/app/api/site/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface BulkFormProps {
  siteData: Site
}

export function BulkForm({ siteData }: BulkFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a CSV or XLSX file"
        })
        return
      }
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a file to upload"
      })
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      await BulkImportUserWithoutSign(siteData.site_id, formData)
      toast({ title: "Success", description: "Users imported successfully" })
      setSelectedFile(null)
      if (e.target instanceof HTMLFormElement) {
        e.target.reset()
      }
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to import users"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Import Users</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Upload CSV or XLSX File</Label>
            <Input
              id="file"
              type="file"
              accept=".csv, .xlsx"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={!selectedFile || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Upload className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Importing..." : "Import Users"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
