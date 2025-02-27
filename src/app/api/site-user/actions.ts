"use server"

import {
  CreateSiteUserWithoutSignRequest,
  SiteUserJoinTable
} from "@/app/api/site-user/types"
import FetchInstance from "@/lib/fetch-instance"
import { HttpError } from "@/lib/http-error"

export async function CreateSiteUserWithoutSign(
  payload: CreateSiteUserWithoutSignRequest
): Promise<CreateSiteUserWithoutSignRequest> {
  try {
    const response = await FetchInstance(`/site-users/create/without/sign`, {
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

export async function BulkImportUserWithoutSign(
  siteId: number,
  formData: FormData
) {
  try {
    const response = await FetchInstance(
      `/site-users/bulk-import/without/sign/${siteId}`,
      {
        method: "POST",
        body: formData
      }
    )

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result
  } catch (error) {
    throw error
  }
}

export async function GetListSiteUserBySiteId(
  siteId: number
): Promise<SiteUserJoinTable[]> {
  try {
    const response = await FetchInstance(`/site-users/list/${siteId}`, {
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
