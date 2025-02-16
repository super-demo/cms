import { CreateButton } from "@/app/(control-panel)/site/_components/create-button"
import { ListBlock } from "@/app/(control-panel)/site/_components/list-block"
import { GetListSiteBySiteTypeId } from "@/app/api/site/actions"
import ContainerLayout from "@/components/layout/container"
import { Separator } from "@/components/ui/separator"

export default async function Page() {
  const [siteData] = await Promise.all([GetListSiteBySiteTypeId(1)])

  return (
    <ContainerLayout>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            List of Sites
          </h1>
          <p className="text-muted-foreground">
            List of sites that you have created. Click on a site to view more
          </p>
        </div>
        <Separator />
        <div>
          <CreateButton />
        </div>
        <div className="space-y-1">
          <ListBlock siteData={siteData} />
        </div>
      </div>
    </ContainerLayout>
  )
}
