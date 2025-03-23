"use client"

import * as React from "react"
import { ChevronRight, Menu } from "lucide-react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const SIDEBAR_COOKIE_NAME = "sidebar-open"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

type SidebarContextValue = {
  open: boolean
  setOpen: (value: boolean | ((value: boolean) => boolean)) => void
  width: number
  collapsible: boolean
  variant: "default" | "compact"
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

interface SidebarProviderProps extends React.PropsWithChildren {
  defaultOpen?: boolean
  open?: boolean
  setOpen?: (open: boolean) => void
  width?: number
  collapsible?: boolean
  variant?: "default" | "compact"
}

function SidebarProvider({
  children,
  defaultOpen = true,
  open: openProp,
  setOpen: setOpenProp,
  width = 260,
  collapsible = true,
  variant = "default",
}: SidebarProviderProps) {
  const [open, _setOpen] = React.useState(() => {
    if (typeof openProp === "boolean") {
      return openProp
    }

    if (typeof window === "undefined") {
      return defaultOpen
    }

    const storedValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${SIDEBAR_COOKIE_NAME}=`))
      ?.split("=")[1]

    return storedValue ? storedValue === "true" : defaultOpen
  })

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open],
  )

  React.useEffect(() => {
    if (typeof openProp === "boolean") {
      _setOpen(openProp)
    }
  }, [openProp])

  return (
    <SidebarContext.Provider
      value={{
        open,
        setOpen,
        width,
        collapsible,
        variant,
      }}
    >
      <div className="grid text-sidebar-foreground md:grid-cols-[auto_1fr]">{children}</div>
    </SidebarContext.Provider>
  )
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right"
  variant?: "default" | "compact"
  collapsible?: boolean
}

function Sidebar({ children, className, side = "left", variant, collapsible, ...props }: SidebarProps) {
  const { open, width, variant: contextVariant, collapsible: contextCollapsible } = useSidebar()
  const sidebarVariant = variant ?? contextVariant
  const sidebarCollapsible = collapsible ?? contextCollapsible

  return (
    <aside
      className={cn(
        "group relative hidden h-screen flex-col overflow-hidden border-r bg-sidebar md:flex",
        open ? "w-[var(--sidebar-width)]" : "w-[var(--sidebar-collapsed-width)]",
        side === "right" && "order-last border-l border-r-0",
        className
      )}
      style={{
        "--sidebar-width": `${width}px`,
        "--sidebar-collapsed-width": sidebarVariant === "compact" ? "4rem" : "0px",
      } as React.CSSProperties}
      {...props}
    >
      {children}
      {sidebarCollapsible && <SidebarCollapseButton side={side} />}
    </aside>
  )
}

interface SidebarCollapseButtonProps {
  side?: "left" | "right"
}

function SidebarCollapseButton({ side = "left" }: SidebarCollapseButtonProps) {
  const { open, setOpen } = useSidebar()

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "absolute bottom-4 size-6 rounded-full border bg-background p-0 opacity-0 shadow-md transition-opacity group-hover:opacity-100",
        side === "left" ? "right-2 translate-x-1/2" : "left-2 -translate-x-1/2",
        open ? "rotate-0" : "rotate-180",
      )}
      onClick={() => setOpen(!open)}
    >
      <ChevronRight className="size-3" />
      <span className="sr-only">{open ? "Collapse" : "Expand"}</span>
    </Button>
  )
}

function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2 py-2", className)} {...props} />
}

function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-auto px-2 py-2", className)} {...props} />
}

function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-auto", className)} {...props} />
}

function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2 py-2", className)} {...props} />
}

function SidebarGroupLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useSidebar()

  if (!open) {
    return null
  }

  return <div className={cn("px-2 text-xs font-medium text-sidebar-foreground/60", className)} {...props} />
}

function SidebarGroupContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-1", className)} {...props} />
}

function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1", className)} {...props} />
}

function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-0.5", className)} {...props} />
}

const sidebarMenuButtonVariants = cva(
  "group relative flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      isActive: {
        true: "bg-sidebar-accent text-sidebar-accent-foreground",
        false: "text-sidebar-foreground/60 hover:text-sidebar-foreground",
      },
      size: {
        default: "h-9",
        lg: "h-11",
      },
    },
    defaultVariants: {
      isActive: false,
      size: "default",
    },
  },
)

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    React.RefAttributes<HTMLButtonElement> {
  asChild?: boolean
  isActive?: boolean
  size?: "default" | "lg"
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, isActive, size, ...props }, ref) => {
    const { open } = useSidebar()

    if (!open) {
      return null
    }

    return (
      <Button
        ref={ref}
        variant="ghost"
        className={cn(sidebarMenuButtonVariants({ isActive, size, className }))}
        {...props}
      />
    )
  },
)
SidebarMenuButton.displayName = "SidebarMenuButton"

function SidebarMenuSub({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useSidebar()

  if (!open) {
    return null
  }

  return <div className={cn("grid gap-1 pl-6", className)} {...props} />
}

function SidebarMenuSubItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-0.5", className)} {...props} />
}

const sidebarMenuSubButtonVariants = cva(
  "group relative flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      isActive: {
        true: "font-medium text-sidebar-foreground",
        false: "text-sidebar-foreground/60 hover:text-sidebar-foreground",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
)

interface SidebarMenuSubButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    React.RefAttributes<HTMLButtonElement> {
  asChild?: boolean
  isActive?: boolean
}

const SidebarMenuSubButton = React.forwardRef<HTMLButtonElement, SidebarMenuSubButtonProps>(
  ({ className, isActive, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        className={cn(sidebarMenuSubButtonVariants({ isActive, className }))}
        {...props}
      />
    )
  },
)
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

function SidebarInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-sidebar-muted px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open, width, variant } = useSidebar()
  const sidebarWidth = variant === "compact" && !open ? 64 : open ? width : 0

  return (
    <div
      className={cn("h-screen overflow-auto", className)}
      style={{ width: `calc(100vw - ${sidebarWidth}px)` }}
      {...props}
    />
  )
}

function SidebarRail() {
  const { open, variant } = useSidebar()

  if (open || variant !== "compact") {
    return null
  }

  return <div className="absolute inset-y-0 right-0 w-px bg-border" />
}

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { setOpen } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-9 w-9", className)}
      onClick={() => setOpen((open) => !open)}
      {...props}
    >
      <Menu className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
}

