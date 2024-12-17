"use server"

import { Organization } from "@/app/api/organization/types"
import FetchInstance from "@/lib/fetch-instance"
import { HttpError } from "@/lib/http-error"

export async function GetOrganizationByUserId(
  userId: number
): Promise<Organization[]> {
  try {
    const response = await FetchInstance(`/organizations/list/${userId}`, {
      method: "GET"
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result
  } catch (error) {
    throw error
  }
}
