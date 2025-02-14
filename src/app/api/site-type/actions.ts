"use server"

import { SiteType, SiteTypeCreate } from "@/app/api/site-type/types"
import FetchInstance from "@/lib/fetch-instance"
import { HttpError } from "@/lib/http-error"

export async function CreateSiteType(
  payload: SiteTypeCreate
): Promise<SiteTypeCreate> {
  try {
    const response = await FetchInstance(`/site-types/create`, {
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

export async function GetListSiteType(): Promise<SiteType[]> {
  try {
    const response = await FetchInstance(`/site-types/list`, {
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
