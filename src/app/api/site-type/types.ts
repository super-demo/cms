export interface SiteType {
  site_type_id: number
  slug: string
  description: string
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  deleted_at: string
}

export interface SiteTypeForm {
  slug: string
  description: string
}
