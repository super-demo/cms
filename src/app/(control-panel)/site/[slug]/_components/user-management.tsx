"use client"

import {
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  Upload,
  UserCog,
  UserPlus,
  X
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import type { SiteUserJoinTable } from "@/app/api/site-user/types"
import type { Site } from "@/app/api/site/types"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

import { BulkForm } from "./bulk-form"
import { CreateForm } from "./create-form"

interface UserManagementProps {
  siteData: Site
  siteUserDataWithJoinTable: SiteUserJoinTable[]
}

export function UserManagement({
  siteData,
  siteUserDataWithJoinTable
}: UserManagementProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [users, setUsers] = useState<SiteUserJoinTable[]>(
    siteUserDataWithJoinTable
  )
  const [filteredUsers, setFilteredUsers] = useState<SiteUserJoinTable[]>(
    siteUserDataWithJoinTable
  )
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false)

  const usersPerPage = 10
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  )

  // Apply filters
  useEffect(() => {
    let result = users

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (user) =>
          user.user.name?.toLowerCase().includes(term) ||
          user.user.email.toLowerCase().includes(term)
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      const isActive = statusFilter === "active"
      result = result.filter((user) => user.is_active === isActive)
    }

    setFilteredUsers(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [users, searchTerm, statusFilter])

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
  }

  const handleUserStatusChange = async (userId: number, isActive: boolean) => {
    // In a real app, you would call your API here
    setUsers(
      users.map((user) =>
        user.site_user_id === userId ? { ...user, is_active: isActive } : user
      )
    )

    toast({
      title: `User ${isActive ? "activated" : "deactivated"}`,
      description: `User has been ${isActive ? "activated" : "deactivated"} successfully`
    })
  }

  const handleDeleteUser = async (userId: number) => {
    // In a real app, you would call your API here
    setUsers(users.filter((user) => user.site_user_id !== userId))

    toast({
      title: "User removed",
      description: "User has been removed from this site"
    })
  }

  const handleExportUsers = () => {
    // In a real app, you would generate and download a CSV/Excel file
    toast({
      title: "Export started",
      description: "User list is being prepared for download"
    })

    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "User list has been downloaded"
      })
    }, 1500)
  }

  const refreshUsers = () => {
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="border-2">
            <CardHeader className="pb-3">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <UserCog className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <CardDescription>
                    {users.length} users for {siteData.name}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                          Add a new user to {siteData.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <CreateForm
                          siteData={siteData}
                          onSuccess={() => {
                            setIsAddUserOpen(false)
                            refreshUsers()
                          }}
                          dialog={true}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={isBulkImportOpen}
                    onOpenChange={setIsBulkImportOpen}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Bulk Import
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Bulk Import Users</DialogTitle>
                        <DialogDescription>
                          Import multiple users via CSV or XLSX file
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <BulkForm
                          siteData={siteData}
                          onSuccess={() => {
                            setIsBulkImportOpen(false)
                            refreshUsers()
                          }}
                          dialog={true}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleExportUsers}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="p-6">
              <Tabs defaultValue="all" className="w-full">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <TabsList>
                    <TabsTrigger value="all">All Users</TabsTrigger>
                    <TabsTrigger value="active">
                      Active ({users.filter((u) => u.is_active).length})
                    </TabsTrigger>
                    <TabsTrigger value="inactive">
                      Inactive ({users.filter((u) => !u.is_active).length})
                    </TabsTrigger>
                  </TabsList>

                  <div className="flex items-center gap-2">
                    <div className="relative w-full sm:w-[240px]">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
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

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Filter Users</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <div className="p-2">
                          <Label htmlFor="status-filter" className="text-xs">
                            Status
                          </Label>
                          <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                          >
                            <SelectTrigger id="status-filter" className="mt-1">
                              <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Statuses</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <DropdownMenuSeparator />
                        <div className="p-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={clearFilters}
                          >
                            Clear Filters
                          </Button>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <TabsContent value="all" className="mt-6">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[100px] text-right">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedUsers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                              No users found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          paginatedUsers.map((user) => (
                            <TableRow key={user.site_user_id}>
                              <TableCell className="font-medium">
                                {user.user.name || "Unnamed User"}
                              </TableCell>
                              <TableCell>{user.user.email}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`h-2 w-2 rounded-full ${
                                      user.is_active
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                    }`}
                                  />
                                  <span>
                                    {user.is_active ? "Active" : "Inactive"}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {user.is_active ? (
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleUserStatusChange(
                                            user.site_user_id,
                                            false
                                          )
                                        }
                                      >
                                        Deactivate User
                                      </DropdownMenuItem>
                                    ) : (
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleUserStatusChange(
                                            user.site_user_id,
                                            true
                                          )
                                        }
                                      >
                                        Activate User
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
                                      onClick={() =>
                                        handleDeleteUser(user.site_user_id)
                                      }
                                    >
                                      Remove User
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="active">
                  {/* Similar table structure for active users */}
                </TabsContent>

                <TabsContent value="inactive">
                  {/* Similar table structure for inactive users */}
                </TabsContent>
              </Tabs>
            </CardContent>

            {totalPages > 1 && (
              <CardFooter className="flex items-center justify-between border-t px-6 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(startIndex + usersPerPage, filteredUsers.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredUsers.length}</span>{" "}
                  users
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (page) =>
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                      )
                      .map((page, index, array) => (
                        <>
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span key={`ellipsis-${page}`} className="px-2">
                              ...
                            </span>
                          )}
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            size="icon"
                            onClick={() => setCurrentPage(page)}
                            className="h-8 w-8"
                          >
                            {page}
                          </Button>
                        </>
                      ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Manage users for {siteData.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => setIsAddUserOpen(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Individual User
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => setIsBulkImportOpen(true)}
              >
                <Upload className="mr-2 h-4 w-4" />
                Bulk Import Users
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={handleExportUsers}
              >
                <Download className="mr-2 h-4 w-4" />
                Export User List
              </Button>
              <Separator />
              <div className="rounded-md bg-muted p-4">
                <h3 className="mb-2 font-medium">User Statistics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Users:</span>
                    <span className="font-medium">{users.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Users:</span>
                    <span className="font-medium">
                      {users.filter((u) => u.is_active).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Inactive Users:
                    </span>
                    <span className="font-medium">
                      {users.filter((u) => !u.is_active).length}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
