import { Bot, Frame, LifeBuoy, Send, SquareTerminal } from "lucide-react"

export const NavMockData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Frame
    },
    {
      title: "Sites",
      url: "/site",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Logs",
          url: "#"
        }
      ]
    },
    {
      title: "Users",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Logs",
          url: "#"
        }
      ]
    }
  ],
  navSecondary: [
    {
      name: "Settings",
      url: "#",
      icon: Frame
    }
  ],
  navSupport: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send
    }
  ]
}
