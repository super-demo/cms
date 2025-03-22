"use server"

import FetchInstance from "../../../lib/fetch-instance"
import { HttpError } from "../../../lib/http-error"
import { SiteLog } from "./types"

export async function GetListSiteLog(): Promise<SiteLog[]> {
  try {
    const response = await FetchInstance(`/site-logs/list`, {
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
