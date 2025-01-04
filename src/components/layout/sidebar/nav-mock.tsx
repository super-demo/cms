import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Send,
  Settings2,
  SquareTerminal
} from "lucide-react"

export const NavMockData = {
  navMain: [
    {
      title: "Users",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "List Users",
          url: "#"
        },
        {
          title: "Roles & Permissions",
          url: "#"
        },
        {
          title: "Logs",
          url: "#"
        }
      ]
    },
    {
      title: "Events",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "List Events",
          url: "#"
        },
        {
          title: "Create Event",
          url: "#"
        },
        {
          title: "Logs",
          url: "#"
        }
      ]
    },
    {
      title: "Reservations",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "List Reservations",
          url: "#"
        },
        {
          title: "Logs",
          url: "#"
        }
      ]
    },
    {
      title: "Leave Requests",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "List Requests",
          url: "#"
        },
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
