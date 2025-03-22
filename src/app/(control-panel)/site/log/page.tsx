import { GetListSiteLog } from "@/app/api/site-log/actions"
import ContainerLayout from "@/components/layout/container"
import { Separator } from "@/components/ui/separator"

import { SiteLogDisplay } from "./_components/site-log-display"

export default async function Page() {
  const siteLogs = await GetListSiteLog()

  return (
    <ContainerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Site Activity Logs
          </h1>
          <p className="text-muted-foreground">
            View and monitor all site-related activities and changes
          </p>
        </div>
        <Separator />
        <SiteLogDisplay initialLogs={siteLogs} />
      </div>
    </ContainerLayout>
  )
}
