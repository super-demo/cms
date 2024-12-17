import { getServerSession } from "next-auth"

import authOption from "@/app/api/auth/[...nextauth]/auth-option"
import { GetOrganizationByUserId } from "@/app/api/organization/actions"
import { GetUserProfile } from "@/app/api/user/actions"
import ContainerLayout from "@/components/layout/container"

export default async function Page() {
  const session = await getServerSession(authOption)
  const { data: userData } = await GetUserProfile(
    session?.user.jwt.userId as number,
    session?.user.jwt.accessToken as string
  )
  const [organizationData] = await Promise.all([
    GetOrganizationByUserId(userData.user_id)
  ])

  console.log("🚀 ~ Page ~ organizationData:", organizationData)

  return (
    <ContainerLayout>
      <div>Organization Page</div>
    </ContainerLayout>
  )
}
