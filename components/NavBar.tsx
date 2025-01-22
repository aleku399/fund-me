"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItemsLeft = () => (
    <>
      <div className="flex items-center space-x-2 cursor-pointer">
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Search</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-auto p-0">
            Donate
            <span className="ml-1">▾</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Search Fundraisers</DropdownMenuItem>
          <DropdownMenuItem>Success Stories</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-auto p-0">
            Fundraise
            <span className="ml-1">▾</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Start a GoFundMe</DropdownMenuItem>
          <DropdownMenuItem>Fundraising Tips</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  const NavItemsRight = () => (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-auto p-0">
            About
            <span className="ml-1">▾</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>How it Works</DropdownMenuItem>
          <DropdownMenuItem>Common Questions</DropdownMenuItem>
          <DropdownMenuItem>Success Stories</DropdownMenuItem>
          <DropdownMenuItem>Supported Countries</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        className="bg-green-600 hover:bg-green-700"
        onClick={() => router.push("/create-campaign")}
      >
        Start a Campaign
      </Button>
    </>
  );

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              <NavItemsLeft />
              <NavItemsRight />
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <div className="relative h-8 w-32 text-green-600">JebaFundMe</div>
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-between space-x-6">
          <div className="flex items-center space-x-6">
            <NavItemsLeft />
          </div>
          <div className="flex items-center space-x-6 ml-auto">
            <NavItemsRight />
          </div>
        </nav>
      </div>
    </header>
  );
}


