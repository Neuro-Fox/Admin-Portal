import { Shield, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

const navigationLinks = [
  {
    title: "Product",
    links: [
      { name: "Mobile App", href: "#mobile-app" },
      { name: "Dashboard", href: "/dashboard" },
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Safety",
    links: [
      { name: "Emergency Response", href: "#emergency" },
      { name: "AI Monitoring", href: "#ai-monitoring" },
      { name: "Geo-fencing", href: "#geo-fencing" },
      { name: "IoT Devices", href: "#iot" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "FAQ", href: "#faq" },
      { name: "Contact Us", href: "#contact" },
      { name: "Documentation", href: "#docs" },
      { name: "Status", href: "#status" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Press", href: "#press" },
      { name: "Partners", href: "#partners" },
    ],
  },
];

const socialLinks = [
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
      </svg>
    ),
  },
];

export default function FooterSection() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black border-t border-gray-800 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <Link
                href="/"
                aria-label="Fox Security Home"
                className="flex items-center space-x-3 group w-fit"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">
                    Fox Security
                  </span>
                  <span className="text-sm text-gray-400 -mt-1">
                    Smart Tourist Safety
                  </span>
                </div>
              </Link>

              <p className="text-gray-300 leading-relaxed max-w-md">
                Protecting tourists across India with AI-powered monitoring,
                blockchain-secured identity, and instant emergency response.
                Your digital shield for safer journeys.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">support@foxsecurity.in</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">+91-9999-SAFETY (724389)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">Bengaluru, Karnataka, India</span>
                </div>
              </div>

              {/* Emergency Notice */}
              <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-4">
                <p className="text-red-300 text-sm font-medium">
                  🚨 For emergencies, dial 112 or use the SOS button in our app
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
              {navigationLinks.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-1 group"
                        >
                          <span>{link.name}</span>
                          {link.href.startsWith("#") === false && (
                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications & Trust Indicators */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Government Approved</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-white/5 rounded-lg"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold mb-2">
                Download Fox Security App
              </h3>
              <p className="text-gray-400 text-sm">
                Stay protected wherever you travel in India
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="#"
                className="flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border border-gray-600 rounded-lg px-4 py-2 transition-all duration-300"
              >
                <div className="w-6 h-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white"
                  >
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4484-.9993-.9993s.4482-.9993.9993-.9993c.5511 0 .9993.4484.9993.9993s-.4482.9993-.9993.9993m-11.046 0c-.5511 0-.9993-.4484-.9993-.9993s.4482-.9993.9993-.9993c.5511 0 .9993.4484.9993.9993s-.4482.9993-.9993.9993m11.4653-6.02c.0989-.2939.1516-.6038.1516-.9297 0-1.6569-1.3431-3-3-3s-3 1.3431-3 3c0 .3259.0527.6358.1516.9297C12.6785 9.444 12.8385 9.5 13 9.5c.1615 0 .3215-.056.4653-.1786.0989-.2939.1516-.6038.1516-.9297 0-.8284-.6716-1.5-1.5-1.5s-1.5.6716-1.5 1.5c0 .3259.0527.6358.1516.9297C11.6785 9.444 11.8385 9.5 12 9.5c.1615 0 .3215-.056.4653-.1786z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm text-white font-semibold">
                    App Store
                  </div>
                </div>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border border-gray-600 rounded-lg px-4 py-2 transition-all duration-300"
              >
                <div className="w-6 h-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="text-sm text-white font-semibold">
                    Google Play
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>
                © {new Date().getFullYear()} Fox Security. All rights reserved.
              </span>
              <div className="flex gap-4">
                <Link
                  href="#privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#cookies"
                  className="hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <div className="w-4 h-4 text-red-500">♥</div>
              <span>for safer travels in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
