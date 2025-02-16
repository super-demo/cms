"use server"

import { Site, SiteForm } from "@/app/api/site/types"
import FetchInstance from "@/lib/fetch-instance"
import { HttpError } from "@/lib/http-error"

export async function GetListSite(): Promise<Site[]> {
  try {
    const response = await FetchInstance(`/sites/list`, {
      method: "GET"
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result.data
  } catch (error) {
    throw error
  }
}

export async function GetListSiteBySiteTypeId(
  siteTypeId: number
): Promise<Site[]> {
  try {
    const response = await FetchInstance(`/sites/list/${siteTypeId}`, {
      method: "GET"
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result.data
  } catch (error) {
    throw error
  }
}

export async function CreateSite(payload: SiteForm): Promise<SiteForm> {
  try {
    const response = await FetchInstance(`/sites/create`, {
      method: "POST",
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result
  } catch (error) {
    throw error
  }
}
