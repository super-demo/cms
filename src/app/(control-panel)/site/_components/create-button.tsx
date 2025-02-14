import Link from "next/link"

import { Button } from "@/components/ui/button"
import { path } from "@/constants/path"

export function CreateButton() {
  return (
    <Button asChild>
      <Link href={path.SITE_CREATE}>Create</Link>
    </Button>
  )
}
