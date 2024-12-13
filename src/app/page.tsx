"use client"

import { Calendar, CheckSquare, MessageSquare, Users } from "lucide-react"
import Link from "next/link"

import ContainerLayout from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Home() {
  const features = [
    {
      name: "Task Management",
      description: "Organize and track tasks efficiently.",
      icon: CheckSquare
    },
    {
      name: "Team Communication",
      description: "Seamless messaging and file sharing.",
      icon: MessageSquare
    },
    {
      name: "Calendar Integration",
      description: "Sync schedules and manage events.",
      icon: Calendar
    },
    {
      name: "Employee Directory",
      description: "Centralized employee information.",
      icon: Users
    }
  ]

  return (
    <ContainerLayout>
      <div className="flex min-h-screen flex-col bg-white">
        <header className="py-8">
          <div className="container mx-auto flex items-center justify-between px-4">
            <Link href="/" className="text-2xl font-light text-gray-900">
              Super<span className="font-semibold">Office</span>
            </Link>
            <nav className="hidden space-x-8 md:flex">
              <Link
                href="#features"
                className="text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-sm" asChild>
                <Link href="/sign">Log in</Link>
              </Button>
              <Button variant="outline" className="text-sm" asChild>
                <Link href="/sign">Sign up</Link>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-grow">
          <div className="bg-gradient-to-b from-white to-gray-50 py-32 text-center">
            <div className="container mx-auto px-4">
              <h1 className="mb-6 text-5xl font-light leading-tight text-gray-900">
                Simplify Your{" "}
                <span className="font-semibold">Office Management</span>
              </h1>
              <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-600">
                Streamline tasks, enhance communication, and boost productivity
                in your workplace with SuperOffice.
              </p>
              <div className="flex justify-center space-x-4">
                <Button size="lg" className="px-8 py-6 text-lg" asChild>
                  <Link href="/organization">Get Started</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          <div className="py-32" id="features">
            <div className="container mx-auto px-4">
              <h2 className="mb-16 text-center text-3xl font-light text-gray-900">
                Powerful Features for{" "}
                <span className="font-semibold">Modern Offices</span>
              </h2>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => (
                  <Card
                    key={feature.name}
                    className="border-0 bg-transparent shadow-none"
                  >
                    <CardHeader className="pb-0 text-center">
                      <feature.icon
                        className="mx-auto mb-6 h-12 w-12 text-gray-900"
                        strokeWidth={1.5}
                      />
                      <h3 className="mb-2 text-xl font-semibold">
                        {feature.name}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-gray-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-900 py-24">
            <div className="container mx-auto px-4 text-center">
              <h2 className="mb-6 text-3xl font-light text-white">
                Ready to{" "}
                <span className="font-semibold">streamline your office</span>?
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-400">
                Start your free trial today and experience the difference
                OfficeFlow can make in your workplace.
              </p>
              <Button
                size="lg"
                className="bg-white px-8 py-6 text-lg text-gray-900 hover:bg-gray-100"
              >
                Get started
              </Button>
            </div>
          </div>
        </main>
        <footer className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <p className="mb-4 text-sm text-gray-600 md:mb-0">
                2024 SuperOffice, All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ContainerLayout>
  )
}
