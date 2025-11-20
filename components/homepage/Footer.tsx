import { Facebook, Youtube, Instagram, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="border-t mt-24 bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-12 gap-8 mb-12">
          {/* MDEC Brand Section - Takes up more space */}
          <div className="md:col-span-4">
            <Image
              src="/images/mdec-white.png"
              alt="MDEC Logo"
              width={180}
              height={48}
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Malaysia Digital Economy Corporation driving the nation&apos;s
              digital transformation
            </p>
            {/* Social Media Links */}
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/MyMDEC/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/mymdec" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/mymdec/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/mymdec" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/mymdec/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2">
            <h4 className="font-semibold mb-4 text-white">Programmes</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/expats"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Expats Service
                </a>
              </li>
              <li>
                <a
                  href="/mtep"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  MTEP
                </a>
              </li>
              <li>
                <a
                  href="/derantau"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  DE Rantau
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Ministry Logo Section */}
          <div className="md:col-span-2 flex flex-col items-start md:items-center">
            <Image
              src="/images/kkd.png"
              alt="Ministry of Digital"
              width={84}
              height={56}
              className="h-14 w-auto mb-2"
            />
            <p className="text-xs text-gray-400 font-semibold">Ministry of Digital</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2025 Malaysia Digital Economy Corporation. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <span className="text-gray-400">
              Privacy Policy
            </span>
            <span className="text-gray-400">
              Terms of Service
            </span>
            <span className="text-gray-400">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

