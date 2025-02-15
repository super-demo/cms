import { CreateForm } from "@/app/(control-panel)/site/create/_components/create-form"
import { GetListSiteType } from "@/app/api/site-type/actions"
import ContainerLayout from "@/components/layout/container"

export default async function Page() {
  const [siteTypeData] = await Promise.all([GetListSiteType()])

  return (
    <ContainerLayout>
      <CreateForm siteTypeData={siteTypeData} />
    </ContainerLayout>
  )
}
