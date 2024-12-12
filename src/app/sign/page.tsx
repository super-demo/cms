"use client"

import { ToastAction } from "@radix-ui/react-toast"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

import ContainerLayout from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function SignInPage() {
  const searchParams = useSearchParams()
  const errorMsg = searchParams.get("error")
  const { toast } = useToast()

  function HandleSignWithGoogle() {
    signIn("google", { callbackUrl: "/" })
  }

  useEffect(() => {
    if (errorMsg) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>
      })
    }
  }, [errorMsg, toast])

  return (
    <ContainerLayout>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Login with your Google account to access the
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button
                type="submit"
                className="w-full"
                onClick={HandleSignWithGoogle}
              >
                Login with Google
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/">Back</Link>
              </Button>
            </div>
            <div className="mt-4 flex justify-center gap-1 text-center text-sm">
              Don&apos;t have an account?{" "}
              <div
                className="cursor-pointer underline"
                onClick={HandleSignWithGoogle}
              >
                Sign up
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ContainerLayout>
  )
}
