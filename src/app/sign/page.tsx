"use client"

import { ToastAction } from "@radix-ui/react-toast"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function AuthenticationPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const errorMsg = searchParams.get("error")
  const { toast } = useToast()

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

  async function HandleSignWithGoogle() {
    setIsLoading(true)
    await signIn("google", { callbackUrl: "/" })
    setIsLoading(false)
  }

  return (
    <>
      <div className="md:hidden">
        <div className="flex h-screen w-full items-center justify-center px-4">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Oops!</CardTitle>
              <CardDescription>
                Sorry, this page is not available on mobile devices.
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button
          variant="link"
          className="absolute right-4 top-4 md:right-8 md:top-8"
          onClick={HandleSignWithGoogle}
        >
          Sign Up
        </Button>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Super Office.
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo; This application simplifies and enhances office
                management, ensuring smoother operations and better
                organization.&rdquo;
              </p>
              <footer className="text-sm">NOPNAPATN & THYMS-C.</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign In to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign In with your Google account to access the
              </p>
            </div>

            <div className={cn("grid gap-3")}>
              <div className="grid gap-2">
                <Button
                  type="button"
                  disabled={isLoading}
                  onClick={HandleSignWithGoogle}
                >
                  {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.google className="h-4 w-4" />
                  )}{" "}
                  Sign In with Google
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/">Back to Home Page</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
