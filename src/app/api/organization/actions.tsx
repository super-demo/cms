"use server"

import { Organization, OrganizationCreate } from "@/app/api/organization/types"
import FetchInstance from "@/lib/fetch-instance"
import { HttpError } from "@/lib/http-error"

export async function CreateOrganization(
  payload: OrganizationCreate
): Promise<OrganizationCreate> {
  try {
    const response = await FetchInstance(`/organizations/create`, {
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

export async function GetOrganizationListByUserId(): Promise<Organization[]> {
// userId: number
  try {
    // const response = await FetchInstance(`/organizations/list/${userId}`, {
    const response = await FetchInstance(`/organizations/list/`, {
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
