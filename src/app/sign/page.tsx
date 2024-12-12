"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

import ContainerLayout from "@/components/layout/container"

export default function SignInPage() {
  const searchParams = useSearchParams()
  const errorMsg = searchParams.get("error")

  return (
    <ContainerLayout>
      <h1>Welcome to</h1>
      <p>CMS Website</p>
      <button
        onClick={() => {
          signIn("google", { callbackUrl: "/" })
        }}
      >
        <p>Sign In With Google</p>
        <div>{errorMsg && <div>{errorMsg}</div>}</div>
      </button>
    </ContainerLayout>
  )
}
