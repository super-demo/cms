import { User as NextAuthUser } from "next-auth"

import { USERLEVEL } from "@/constants/user-level"

declare module "next-auth" {
  enum UserLevel {
    SuperAdmin = USERLEVEL.SuperAdmin,
    Admin = USERLEVEL.Admin,
    Member = USERLEVEL.Member
  }

  interface UserJWT {
    userId: number
    userLevelId?: UserLevel
    accessToken: string
    expiresAt: number
  }

  interface User extends NextAuthUser {
    jwt: UserJWT
    userId?: number
    userLevelId?: UserLevel
  }

  interface Session {
    user: {
      email: string
      name: string
      image: string
      jwt: {
        userId: number
        userLevelId?: UserLevel
        accessToken: string
        expiresAt: number
      }
    }
    error?: "AccessTokenError"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: number
    userLevelId?: UserLevel
    accessToken: string
    expiresAt: number
    user: User
    error?: "AccessTokenError"
  }
}
