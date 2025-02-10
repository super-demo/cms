"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"

export default function Page() {
  return (
    <div>
      <div>Sign Page</div>
      <button
        onClick={async () => await signIn("google", { callbackUrl: "/" })}
      >
        Sign
      </button>
      <div>
        <Link href={"/"}>Back to Home</Link>
      </div>
    </div>
  )
}
