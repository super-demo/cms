import { GetSiteById } from "@/app/api/site/actions"
import ContainerLayout from "@/components/layout/container"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { GetListSiteUserBySiteId } from "../../../api/site-user/actions"
import { DetailBlock } from "./_components/detail-block"
import { UserManagement } from "./_components/user-management"

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const [siteData] = await Promise.all([GetSiteById(Number(slug))])
  const [siteUserDataWithJoinTable] = await Promise.all([
    GetListSiteUserBySiteId(siteData.site_id)
  ])

  return (
    <ContainerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Management</h1>
          <p className="text-muted-foreground">
            Manage details and users for{" "}
            <span className="font-medium">{siteData.name}</span>
          </p>
        </div>
        <Separator />
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="details">Site Details</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-6 pt-4">
            <DetailBlock site={siteData} />
          </TabsContent>
          <TabsContent value="users" className="space-y-6 pt-4">
            <UserManagement
              siteData={siteData}
              siteUserDataWithJoinTable={siteUserDataWithJoinTable}
            />
          </TabsContent>
        </Tabs>
      </div>
    </ContainerLayout>
  )
}
