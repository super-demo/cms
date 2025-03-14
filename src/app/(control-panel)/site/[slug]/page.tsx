import { GetSiteById } from "@/app/api/site/actions"
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
