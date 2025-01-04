import { Button } from "../../../components/ui/button"

export default function Page() {
  function HandleDeleteOrganization() {
    // Delete organization
  }

  return (
    <div>
      <>Info Organization</>
      <Button variant="destructive" onClick={HandleDeleteOrganization}>
        Delete Organization
      </Button>
    </div>
  )
}
