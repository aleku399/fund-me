import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Youtube,  Globe } from "lucide-react"

function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <select className="bg-transparent text-sm">
              <option>United States</option>
              {/* Add more countries as needed */}
            </select>
            <span className="text-muted-foreground">•</span>
            <select className="bg-transparent text-sm">
              <option>English</option>
              {/* Add more languages as needed */}
            </select>
          </div>

          {/* Center Links */}
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Privacy Notice
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Legal
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Accessibility Statement
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
          </nav>

          {/* Social Media & App Links */}
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <Link key={label} href="#" className="text-muted-foreground hover:text-foreground">
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">© 2010-2025 UNSD</p>
            <Button variant="link" className="h-auto p-0 text-sm">
              Your Privacy Choices
            </Button>
          </div>
          <div className="flex gap-2">
            <Link href="#">
              <img src="/play-store-v2.png" alt="Get it on Google Play" className="h-10" />
            </Link>
            <Link href="#">
              <img src="/app-store.png" alt="Download on the App Store" className="h-10" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

