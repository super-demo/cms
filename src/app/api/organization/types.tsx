import { UserProfile } from "@/app/api/user/types"

export interface Organization {
  organization_id: number
  name: string
  description: string
  short_description: string
  url: string
  image_url: string
  created_at: string
  created_by: UserProfile
  updated_at: string
  updated_by: UserProfile
}

export interface OrganizationCreate {
  name: string
  description: string
  short_description: string
  image_url: string
}
