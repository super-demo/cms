import CreateForm from "@/app/(control-panel)/site/type/_components/create-form"
import { ListForm } from "@/app/(control-panel)/site/type/_components/list-form"
import { GetListSiteType } from "@/app/api/site-type/actions"
import ContainerLayout from "@/components/layout/container"
import { Separator } from "@/components/ui/separator"

export default async function Page() {
  const [siteTypeData] = await Promise.all([GetListSiteType()])

  return (
    <ContainerLayout>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Site of Type
          </h1>
          <p className="text-muted-foreground">
            Site of Type is a collection of sites that share the same type.
          </p>
        </div>
        <Separator />
        <div className="space-y-1">
          <CreateForm siteTypeData={siteTypeData} />
        </div>
        <Separator />
        <div className="space-y-1">
          <ListForm siteTypeData={siteTypeData} />
        </div>
      </div>
    </ContainerLayout>
  )
}
