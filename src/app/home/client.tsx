"use client"

import { signOut } from "next-auth/react"

import { UserProfile } from "../api/user/types"

interface Props {
  userData: UserProfile
}

export default function Client(props: Props) {
  return (
    <div>
      <div>Home Page with Login</div>
      <button onClick={() => signOut({ callbackUrl: "/sign" })}>
        Sign Out
      </button>
      <div>{JSON.stringify(props.userData)}</div>
    </div>
  )
}
