import type { ReactNode } from "react"
import { auth } from "auth"
import { signIn, signOut } from "auth"


export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()
  
  return (
    <html lang="en">
      <body>
        { session?.user ? (
          <div>
            <p>
              {session.user.name}
            </p>
            <p>
              {session.user.email}
            </p>
            <form
              action={async () => {
                'use server'
                await signOut()
              }}
            >
              <button>Sign Out</button>
            </form>
          </div>
        ) : (
          <form
            action={async () => {
              'use server'
              await signIn()
            }}
          >
            <button>Sign In</button>
          </form>
        ) }
        <main>{children}</main>
      </body>
    </html>
  )
}
