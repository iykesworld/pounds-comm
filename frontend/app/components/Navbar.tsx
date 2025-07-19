"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ShoppingCart, User, Moon, Sun, Smartphone, Tablet, Watch, Headphones } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAppSelector } from "../redux/store"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const cartCount = useAppSelector((state) => state.cart.totalQuantity)
  const router = useRouter();

  // Set dark mode as default on first load
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  }

  // Scroll to section by id
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleCartClick = () => {
    router.push("/cart");
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-14 w-14 rounded-lg flex items-center justify-center">
            <Image src="/WhatsApp Image 2025-07-18 at 4.36.29 PM.jpeg" alt="PoundsComms" width={100} height={100} />
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">Shop</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => scrollToSection("smartphones")}><Smartphone className="mr-2 h-4 w-4" />Smartphones</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollToSection("tablets")}><Tablet className="mr-2 h-4 w-4" />Tablets</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollToSection("smartwatches")}><Watch className="mr-2 h-4 w-4" />Smartwatches</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollToSection("accessories")}><Headphones className="mr-2 h-4 w-4" />Accessories</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" onClick={() => scrollToSection("contact")}>Contact Us</Button>
        </div>

        <div className="flex items-center space-x-4">
          {/* {searchExpanded ? (
            <Input
              type="search"
              placeholder="Search products..."
              className="w-64"
              onBlur={() => setSearchExpanded(false)}
              autoFocus
            />
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchExpanded(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )} */}

          <Button variant="ghost" size="icon" className="relative" onClick={handleCartClick} aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/auth/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/orders">Orders</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                <Link href="/logout">Logout</Link>
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </nav>
  )
}
