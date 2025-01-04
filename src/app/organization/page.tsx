import { PlusIcon } from "lucide-react"
import Link from "next/link"

import { GetOrganizationListByUserId } from "@/app/api/organization/actions"
import OrganizationList from "@/app/organization/_components/list-organization"
import ContainerLayout from "@/components/layout/container"
import { Button } from "@/components/ui/button"

export default async function OrganizationPage() {
  const [organizationData] = await Promise.all([GetOrganizationListByUserId()])

  return (
    <ContainerLayout>
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-black">Organizations</p>
              <p className="text-gray-500">Manage your organizations here.</p>
            </div>

            <Button asChild>
              <Link href="/organization/create">
                <PlusIcon className="h-4 w-4" />
                Create
              </Link>
            </Button>
          </div>
          <OrganizationList organizations={organizationData} />
        </div>
      </div>
    </ContainerLayout>
  )
}
