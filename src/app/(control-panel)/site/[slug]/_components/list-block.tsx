// "use client"

// import { SiteUserJoinTable } from "../../../../api/site-user/types"

// interface ListBlockProps {
//   siteUserDataWithJoinTable: SiteUserJoinTable[]
// }

// export function ListBlock(props: ListBlockProps) {
//   return (
//     <div className="space-y-1">
//       <h2 className="text-lg font-semibold tracking-tight">List of Users</h2>
//       <div className="space-y-1">
//         {props.siteUserDataWithJoinTable.map((siteUser) => (
//           <div key={siteUser.site_user_id}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-semibold">{siteUser.user.name}</p>
//                 <p className="text-sm text-muted-foreground">
//                   {siteUser.user.email}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm">
//                   {siteUser.is_active ? "Active" : "Inactive"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

"use client"

import type { SiteUserJoinTable } from "@/app/api/site-user/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

interface ListBlockProps {
  siteUserDataWithJoinTable: SiteUserJoinTable[]
}

export function ListBlock({ siteUserDataWithJoinTable }: ListBlockProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {siteUserDataWithJoinTable.map((siteUser) => (
              <TableRow key={siteUser.site_user_id}>
                <TableCell>{siteUser.user.name}</TableCell>
                <TableCell>{siteUser.user.email}</TableCell>
                <TableCell>
                  <Badge variant={siteUser.is_active ? "default" : "secondary"}>
                    {siteUser.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
