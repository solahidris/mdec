export const Footer = () => {
  return (
    <footer className="border-t mt-24 bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              src="/images/mdec-white.png"
              alt="MDEC Logo"
              className="h-10 w-auto mb-3"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Malaysia Digital Economy Corporation driving the nation's
              digital transformation
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Programmes</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
                >
                  Expats Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
                >
                  MTEP
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
                >
                  DE Rantau
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
                >
                  Guidelines
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-400">
              © 2025 Malaysia Digital Economy Corporation. All rights
              reserved.
            </p>
            <div className="flex flex-col items-center">
              <img
                src="/images/kkd.png"
                alt="Ministry of Digital"
                className="h-12 w-auto mb-1"
              />
              <p className="text-xs text-gray-400 text-center font-semibold leading-tight w-28">
                Ministry of Digital
              </p>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

