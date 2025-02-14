export interface SiteType {
  site_type_id: number
  slug: string
  description: string
}

export interface SiteTypeCreate {
  slug: string
  description: string
}
