import "./globals.css"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { auth } from "auth"
import { SignIn, SignOut } from "@/components/auth-components"

export const metadata: Metadata = {
  title: "NextAuth.js Example",
  description:
    "This is an example site to demonstrate how to use NextAuth.js for authentication",
}

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session?.user) {
    return (
      <>
        <SignIn />
        <main>{children}</main>
      </>
    )
  }
  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">
            {session.user.name}
          </p>
          <p className="text-xs leading-none text-muted-foreground">
            {session.user.email}
          </p>
        </div>
        <SignOut />
      </div>
      <main>{children}</main>
    </>
  )
}
