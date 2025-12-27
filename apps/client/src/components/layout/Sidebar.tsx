import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Home,
  PlusCircle,
  Trophy,
  BarChart3,
  Menu,
  Moon,
  Sun,
  ChevronLeft,
} from "lucide-react"

const navItems = [
  { path: "/", icon: Home, label: "Dashboard" },
  { path: "/create-club", icon: PlusCircle, label: "Create Club" },
  { path: "/input-match", icon: BarChart3, label: "Input Match" },
  { path: "/view-klasemen", icon: Trophy, label: "View Klasemen" },
  { path: "/real-klasemen", icon: Trophy, label: "Live Standings" },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { theme, setTheme } = useTheme()
  const location = useLocation()

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen border-r bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && (
            <h1 className="text-xl font-bold text-primary animate-fade-in">
              ⚽ Foot Lab
            </h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent",
                    isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && (
                    <span className="animate-fade-in">{item.label}</span>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t space-y-2">
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "default"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            {!collapsed && <span className="ml-2">Toggle Theme</span>}
          </Button>
          
          {!collapsed && (
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted animate-fade-in">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                RGS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">RGS</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
