"use server"

import { SiteType, SiteTypeForm } from "@/app/api/site-type/types"
import FetchInstance from "@/lib/fetch-instance"
import { HttpError } from "@/lib/http-error"

export async function CreateSiteType(
  payload: SiteTypeForm
): Promise<SiteTypeForm> {
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

export async function UpdateSiteType(
  payload: SiteTypeForm
): Promise<SiteTypeForm> {
  try {
    const response = await FetchInstance(`/site-types/update`, {
      method: "PUT",
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

export async function DeleteSiteType(payload: SiteType): Promise<SiteType> {
  try {
    const response = await FetchInstance(`/site-types/delete`, {
      method: "DELETE",
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
