"use client"

import {
    Activity,
    AlertCircle,
    Calendar,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock,
    Download,
    Filter,
    Info,
    Search,
    SlidersHorizontal,
    X
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import type { SiteLog } from "@/app/api/site-log/types"
import { Badge } from "@/components/ui/badge"
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
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"

interface SiteLogDisplayProps {
  initialLogs: SiteLog[]
}

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date)
}

// Helper function to format times
const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  }).format(date)
}

// Helper function to get badge variant based on action type
const getActionBadgeVariant = (action: string) => {
  const actionLower = action.toLowerCase()
  if (actionLower.includes("create") || actionLower.includes("add"))
    return "default"
  if (actionLower.includes("update") || actionLower.includes("edit"))
    return "secondary"
  if (actionLower.includes("delete") || actionLower.includes("remove"))
    return "destructive"
  return "outline"
}

export function SiteLogDisplay({ initialLogs }: SiteLogDisplayProps) {
  const [logs] = useState<SiteLog[]>(initialLogs)
  const [filteredLogs, setFilteredLogs] = useState<SiteLog[]>(initialLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [siteFilter, setSiteFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // Extract unique actions and site IDs for filters
  const uniqueActions = useMemo(() => {
    const actions = new Set(logs.map((log) => log.action))
    return Array.from(actions)
  }, [logs])

  const uniqueSiteIds = useMemo(() => {
    const siteIds = new Set(logs.map((log) => log.site_id))
    return Array.from(siteIds)
  }, [logs])

  // Pagination settings
  const logsPerPage = 10
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage)
  const startIndex = (currentPage - 1) * logsPerPage
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage)

  // Apply filters and sorting
  useEffect(() => {
    setIsLoading(true)
    let result = [...logs]

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (log) =>
          log.action.toLowerCase().includes(term) ||
          log.detail.toLowerCase().includes(term) ||
          log.site_id.toString().includes(term)
      )
    }

    // Action filter
    if (actionFilter !== "all") {
      result = result.filter((log) => log.action === actionFilter)
    }

    // Site filter
    if (siteFilter !== "all") {
      result = result.filter((log) => log.site_id.toString() === siteFilter)
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      if (dateFilter === "today") {
        result = result.filter((log) => new Date(log.created_at) >= today)
      } else if (dateFilter === "week") {
        const weekAgo = new Date(today)
        weekAgo.setDate(weekAgo.getDate() - 7)
        result = result.filter((log) => new Date(log.created_at) >= weekAgo)
      } else if (dateFilter === "month") {
        const monthAgo = new Date(today)
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        result = result.filter((log) => new Date(log.created_at) >= monthAgo)
      }
    }

    // Sorting
    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()

      if (sortBy === "newest") {
        return dateB - dateA
      } else if (sortBy === "oldest") {
        return dateA - dateB
      } else if (sortBy === "site-asc") {
        return a.site_id - b.site_id || dateB - dateA
      } else if (sortBy === "site-desc") {
        return b.site_id - a.site_id || dateB - dateA
      }
      return 0
    })

    setFilteredLogs(result)
    setCurrentPage(1) // Reset to first page when filters change

    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }, [logs, searchTerm, actionFilter, siteFilter, dateFilter, sortBy])

  const clearFilters = () => {
    setSearchTerm("")
    setActionFilter("all")
    setSiteFilter("all")
    setDateFilter("all")
  }

  // Function to format date for CSV
  const formatDateForCSV = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
  }

  // Function to format time for CSV
  const formatTimeForCSV = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split('T')[1].split('.')[0]
  }

  // Convert logs to CSV format
  const logsToCSV = (logs: SiteLog[]) => {
    // Define CSV header
    const headers = [
      "Site Log ID",
      "Action",
      "Site ID",
      "Detail",
      "User ID",
      "Date",
      "Time"
    ]

    // Create header row
    let csv = headers.join(",") + "\n"

    // Add data rows
    logs.forEach((log) => {
      const row = [
        log.site_log_id,
        `"${log.action.replace(/"/g, '""')}"`, // Escape quotes in CSV
        log.site_id,
        `"${log.detail.replace(/"/g, '""')}"`, // Escape quotes in CSV
        log.created_by,
        formatDateForCSV(log.created_at),
        formatTimeForCSV(log.created_at)
      ]
      csv += row.join(",") + "\n"
    })

    return csv
  }

  const handleExportLogs = async () => {
    try {
      setIsExporting(true)
      
      // Generate filename with current date
      const date = new Date()
      const formattedDate = date.toISOString().split('T')[0]
      const filename = `site_logs_export_${formattedDate}.csv`
      
      // Convert logs to CSV
      const csvContent = logsToCSV(filteredLogs)
      
      // Create blob and download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      
      // Create a temporary link element and trigger download
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      
      // Clean up
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      setIsExporting(false)
    } catch (error) {
      console.error("Error exporting logs:", error)
      setIsExporting(false)
      alert("An error occurred while exporting logs. Please try again.")
    }
  }

  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            <CardTitle>Activity Logs</CardTitle>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportLogs}
              disabled={isExporting || filteredLogs.length === 0}
            >
              {isExporting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export to CSV
                </>
              )}
            </Button>
          </div>
        </div>
        <CardDescription>
          {filteredLogs.length} log entries found
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
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

          <div className="flex flex-wrap gap-2">
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[140px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Action</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {uniqueActions.map((action) => (
                  <SelectItem key={action} value={action}>
                    {action}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={siteFilter} onValueChange={setSiteFilter}>
              <SelectTrigger className="w-[140px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Site ID</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                {uniqueSiteIds.map((siteId) => (
                  <SelectItem key={siteId} value={siteId.toString()}>
                    Site {siteId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[140px]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Date</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="mr-2 h-3.5 w-3.5" />
                  Sort
                  <ChevronDown className="ml-2 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={sortBy === "newest"}
                  onCheckedChange={() => setSortBy("newest")}
                >
                  Newest First
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortBy === "oldest"}
                  onCheckedChange={() => setSortBy("oldest")}
                >
                  Oldest First
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortBy === "site-asc"}
                  onCheckedChange={() => setSortBy("site-asc")}
                >
                  Site ID (Ascending)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortBy === "site-desc"}
                  onCheckedChange={() => setSortBy("site-desc")}
                >
                  Site ID (Descending)
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {(searchTerm ||
              actionFilter !== "all" ||
              siteFilter !== "all" ||
              dateFilter !== "all") && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="mr-2 h-3.5 w-3.5" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-[300px] items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="text-sm text-muted-foreground">Loading logs...</p>
            </div>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="flex h-[300px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
            <AlertCircle className="mb-2 h-8 w-8 text-muted-foreground" />
            <h3 className="mb-1 text-lg font-medium">No logs found</h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm ||
              actionFilter !== "all" ||
              siteFilter !== "all" ||
              dateFilter !== "all"
                ? "No logs match your current filters"
                : "There are no activity logs to display"}
            </p>
            {(searchTerm ||
              actionFilter !== "all" ||
              siteFilter !== "all" ||
              dateFilter !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="mt-4"
              >
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Site ID</TableHead>
                  <TableHead className="hidden md:table-cell">Detail</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="hidden sm:table-cell">Time</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    User ID
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLogs.map((log) => (
                  <TableRow key={log.site_log_id}>
                    <TableCell>
                      <Badge variant={getActionBadgeVariant(log.action)}>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono">{log.site_id}</span>
                    </TableCell>
                    <TableCell className="hidden max-w-[300px] truncate md:table-cell">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help text-left">
                            <div className="flex items-center gap-1">
                              <span className="line-clamp-1">{log.detail}</span>
                              <Info className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="max-w-[400px] text-sm"
                          >
                            {log.detail}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{formatDate(log.created_at)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{formatTime(log.created_at)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="font-mono">{log.created_by}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {totalPages > 1 && (
        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(startIndex + logsPerPage, filteredLogs.length)}
            </span>{" "}
            of <span className="font-medium">{filteredLogs.length}</span> logs
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                      variant={currentPage === page ? "default" : "outline"}
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
  )
}