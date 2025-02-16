import { GetSiteByName } from "@/app/api/site/actions"
import ContainerLayout from "@/components/layout/container"
import { Separator } from "@/components/ui/separator"

import { CreateForm } from "./_components/create-form"
import { DetailBlock } from "./_components/detail-block"

interface PageProps {
  slug: string
}

export default async function Page({ params }: { params: PageProps }) {
  const [siteData] = await Promise.all([GetSiteByName(params.slug)])

  return (
    <ContainerLayout>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Site Detail - {siteData.name}
          </h1>
          <p className="text-muted-foreground">
            Detail of site that you have created. Click on a site to view more
          </p>
        </div>
        <Separator />
        <div className="space-y-1">
          <DetailBlock site={siteData} />
        </div>
        <Separator />
        <div className="space-y-1">
          <CreateForm siteData={siteData} />
        </div>
      </div>
    </ContainerLayout>
  )
}
