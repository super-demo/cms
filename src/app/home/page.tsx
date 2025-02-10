import { getServerSession } from "next-auth"

import authOption from "../api/auth/[...nextauth]/auth-option"
import { GetUserProfile } from "../api/user/actions"
import Client from "./client"

export default async function Page() {
  const session = await getServerSession(authOption)
  const { data: userData } = await GetUserProfile(
    session?.user.jwt.userId as number,
    session?.user.jwt.accessToken as string
  )
  return (
    <div>
      <Client userData={userData} />
    </div>
  )
}
