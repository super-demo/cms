import Link from "next/link"

export default function Page() {
  return (
    <div>
      <div>Home Page without Login</div>
      <Link href={"/sign"}>Go to Sign Up Page</Link>
    </div>
  )
}
