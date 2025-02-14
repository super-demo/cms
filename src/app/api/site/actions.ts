"use server"

import { SiteCreate } from "@/app/api/site/types"
import FetchInstance from "@/lib/fetch-instance"
import { HttpError } from "@/lib/http-error"

export async function CreateSite(payload: SiteCreate): Promise<SiteCreate> {
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
