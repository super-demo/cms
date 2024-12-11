import { withAuth } from "next-auth/middleware"
// import { NextRequest } from "next/server"

export default withAuth(
  function middleware() {
    // function middleware(req: NextRequest) {
    // if (req.nextUrl.pathname === "/") {
    //   return NextResponse.redirect(new URL("/app", req.url))
    // }
    // return NextResponse.next()
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      authorized: async ({ token }) => {
        if (!token) {
          return false
        }

        // TODO: Implement session handler instead this
        if (Date.now() > token.expiresAt * 1000) {
          return false
        }

        return true
      }
    },
    pages: {
      signIn: "/sign"
    }
  }
)

// Configure middleware matching paths
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /_static (static files)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, sitemap.xml (static files)
     * 6. /login (login page)
     */
    "/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml|login).*)"
  ]
}
