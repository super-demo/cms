"use client"

import { signOut } from "next-auth/react"

export default function Home() {
  return (
    <div>
      <h1>Super Office | CMS</h1>
      <p>A CMS for Super Office</p>
      <a href="/organization/template/dashboard">
        <p>Go to Dashboard</p>
      </a>
      <button onClick={() => signOut({ callbackUrl: "/sign-in" })}>
        <p>Logout</p>
      </button>
    </div>
  )
}
