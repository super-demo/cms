export const path = {
  ROOT: "/",
  DASHBOARD: "/dashboard",
  SITE: "/site",
  SITE_CREATE: "/site/create",
  SITE_TYPE: "/site/type",
  SITE_TYPE_CREATE: "/site/type/create",
  SITE_LOG: "/site/log",
  USER: "/user",
  USER_LOG: "/user/log"
}

export const pathWithSlug = {
  SITE_SLUG: (slug: string) => `${path.SITE}/${slug}`
}
