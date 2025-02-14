import { CreateForm } from "@/app/(control-panel)/site/create/_components/create-form"
import { GetListSiteType } from "@/app/api/site-type/actions"

export default async function Page() {
  const [siteTypeData] = await Promise.all([GetListSiteType()])

  return (
    <div className="p-6">
      <CreateForm siteTypeData={siteTypeData} />
    </div>
  )
}
