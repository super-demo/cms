import Link from "next/link"

import { Organization } from "@/app/api/organization/types"
import { Card, CardContent } from "@/components/ui/card"

interface OrganizationListProps {
  organizations: Organization[]
}

export default function OrganizationList({
  organizations
}: OrganizationListProps) {
  if (organizations.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No organizations found. Create one to get started.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {organizations.map((org) => (
        <Link
          href={`organization/${org.name}/dashboard`}
          key={org.organization_id}
        >
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{org.name}</h3>
              <p className="text-sm text-gray-600">{org.short_description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
