import Image from "next/image"
import Link from "next/link"
export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
          <Link href="/" className="flex items-center space-x-2">
          <div className="h-50 w-50 rounded-lg flex items-center justify-center">
            <Image src="/WhatsApp Image 2025-07-18 at 4.36.07 PM.jpeg" alt="PoundsComms" width={300} height={300} />
          </div>
        </Link>
            <p className="text-gray-400 mb-8">Your trusted partner for all things Phone Accessories</p>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">© {new Date().getFullYear()} Pounds Comm Ltd. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  