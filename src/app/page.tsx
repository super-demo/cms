"use client"

import { signOut } from "next-auth/react"

import ContainerLayout from "@/components/layout/container"

export default function Home() {
  return (
    <ContainerLayout>
      <h1>Super Office | CMS</h1>
      <p>A CMS for Super Office</p>
      <a href="/organization/template/dashboard">
        <p>Go to Dashboard</p>
      </a>
      <button onClick={() => signOut({ callbackUrl: "/sign" })}>
        <p>Logout</p>
      </button>
    </ContainerLayout>
  )
}
