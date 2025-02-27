// import { GetSiteByName } from "@/app/api/site/actions"
// import ContainerLayout from "@/components/layout/container"
// import { Separator } from "@/components/ui/separator"

// import { GetListSiteUserBySiteId } from "../../../api/site-user/actions"
// import { BulkForm } from "./_components/bulk-form"
// import { CreateForm } from "./_components/create-form"
// import { DetailBlock } from "./_components/detail-block"
// import { ListBlock } from "./_components/list-block"

// export default async function Page({
//   params
// }: {
//   params: Promise<{ slug: string }>
// }) {
//   const slug = (await params).slug
//   const [siteData] = await Promise.all([GetSiteByName(slug)])
//   const [siteUserDataWithJoinTable] = await Promise.all([
//     GetListSiteUserBySiteId(siteData.site_id)
//   ])

//   return (
//     <ContainerLayout>
//       <div className="space-y-6">
//         <div className="space-y-1">
//           <h1 className="text-2xl font-semibold tracking-tight">
//             Site Detail - {siteData.name}
//           </h1>
//           <p className="text-muted-foreground">
//             Detail of site that you have created. Click on a site to view more
//           </p>
//         </div>
//         <Separator />
//         <div className="space-y-1">
//           <DetailBlock site={siteData} />
//         </div>
//         <Separator />
//         <div className="space-y-1">
//           <CreateForm siteData={siteData} />
//         </div>
//         <Separator />
//         <div className="space-y-1">
//           <BulkForm siteData={siteData} />
//         </div>
//         <Separator />
//         <div className="space-y-1">
//           <ListBlock siteUserDataWithJoinTable={siteUserDataWithJoinTable} />
//         </div>
//       </div>
//     </ContainerLayout>
//   )
// }

import { GetSiteByName } from "@/app/api/site/actions"
import ContainerLayout from "@/components/layout/container"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { GetListSiteUserBySiteId } from "../../../api/site-user/actions"
import { BulkForm } from "./_components/bulk-form"
import { CreateForm } from "./_components/create-form"
import { DetailBlock } from "./_components/detail-block"
import { ListBlock } from "./_components/list-block"

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const [siteData] = await Promise.all([GetSiteByName(slug)])
  const [siteUserDataWithJoinTable] = await Promise.all([
    GetListSiteUserBySiteId(siteData.site_id)
  ])

  return (
    <ContainerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Management</h1>
          <p className="text-muted-foreground">
            Manage details and users for {siteData.name}
          </p>
        </div>
        <Separator />
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Site Details</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-6">
            <DetailBlock site={siteData} />
          </TabsContent>
          <TabsContent value="users" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <CreateForm siteData={siteData} />
                <BulkForm siteData={siteData} />
              </div>
              <ListBlock
                siteUserDataWithJoinTable={siteUserDataWithJoinTable}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ContainerLayout>
  )
}
