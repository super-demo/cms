import { UserProfile } from "@/app/api/user/types"

export interface Site {
  site_id: number
  site_type_id: number
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

export interface SiteForm {
  site_type_id: number
  name: string
  description: string
  short_description: string
  image_url: string
}
