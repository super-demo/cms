import { UserProfile } from "@/app/api/user/types"

export interface Organization {
  organizationId: number
  name: string
  description: string
  url: string
  imageUrl: string
  createdAt: string
  createdBy: UserProfile
  updatedAt: string
  updatedBy: UserProfile
}
