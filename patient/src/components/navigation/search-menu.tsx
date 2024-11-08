"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CalendarIcon,
  FileTextIcon,
  MagnifyingGlassIcon,
  PersonIcon,
  GearIcon,
} from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { DialogProps } from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

const patientNavItems = [
  { title: "Dashboard", href: "/", icon: PersonIcon },
  { title: "Appointments", href: "/appointments", icon: CalendarIcon },
  { title: "Medical Records", href: "/medical-records", icon: FileTextIcon },
  { title: "Test Results", href: "/test-results", icon: FileTextIcon },
  { title: "Profile", href: "/profile", icon: PersonIcon },
  { title: "Settings", href: "/settings", icon: GearIcon },
]

export function SearchMenu({ ...props }: DialogProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search patient portal...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {patientNavItems.map((navItem) => (
              <CommandItem
                key={navItem.href}
                value={navItem.title}
                onSelect={() => {
                  runCommand(() => router.push(navItem.href))
                }}
              >
                <navItem.icon className="mr-2 h-4 w-4" />
                {navItem.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Quick Actions">
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push("/book-appointment"))
              }}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Book New Appointment
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push("/emergency-contact"))
              }}
            >
              <PersonIcon className="mr-2 h-4 w-4" />
              Update Emergency Contact
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}