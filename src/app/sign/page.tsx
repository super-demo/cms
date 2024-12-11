"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

export default function SignInPage() {
  const searchParams = useSearchParams()
  const errorMsg = searchParams.get("error")

  return (
    <div>
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
    </div>
  )
}
