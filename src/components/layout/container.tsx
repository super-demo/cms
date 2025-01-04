import { cn } from "@/lib/utils"

interface ContainerLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function ContainerLayout(props: ContainerLayoutProps) {
  return <div className={cn("", props.className)}>{props.children}</div>
}
