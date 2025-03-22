import CreateForm from "@/app/(control-panel)/site/type/_components/create-form"
import { ListForm } from "@/app/(control-panel)/site/type/_components/list-form"
import { GetListSiteType } from "@/app/api/site-type/actions"
import ContainerLayout from "@/components/layout/container"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function Page() {
  const [siteTypeData] = await Promise.all([GetListSiteType()])

  return (
    <ContainerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Types</h1>
          <p className="text-muted-foreground">
            Manage the different types of sites in your system
          </p>
        </div>
        <Separator />

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="list">View Types</TabsTrigger>
            <TabsTrigger value="create">Create Type</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4 pt-4">
            <ListForm siteTypeData={siteTypeData} />
          </TabsContent>

          <TabsContent value="create" className="space-y-4 pt-4">
            <CreateForm siteTypeData={siteTypeData} />
          </TabsContent>
        </Tabs>
      </div>
    </ContainerLayout>
  )
}
