'use client'
import Container from '@/components/ui/Container'
import { Text } from '@/components/ui'

export default function Footer() {
  const footerLinks = {
    Products: [
      { label: 'Product Demo', href: '#demo' },
      { label: 'How it Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Industries', href: '#industries' },
    ],
    Resources: [
      { label: 'Documentation', href: '#docs' },
      { label: 'API Reference', href: '#api' },
      { label: 'Help Center', href: '#help' },
      { label: 'Community', href: '#community' },
    ],
    Content: [
      { label: 'Blog', href: '#blog' },
      { label: 'Case Studies', href: '#case-studies' },
      { label: 'Community', href: '#community' },
    ],
    Company: [
      { label: 'About Us', href: '#about' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Security', href: '#security' },
      { label: 'Compliance', href: '#compliance' },
    ],
  }

  return (
    <footer className="bg-white border-t border-gray-200 py-16">
      <Container>
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="text-2xl font-bold text-gray-900 mb-4 block">
              TryOn AR
            </a>
            <Text className="text-gray-600 mb-6">
              Get the latest AR trends, product updates, and success stories delivered to your
              inbox.
            </Text>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F3AED] focus:border-transparent"
              />
              <button className="bg-[#9F3AED] text-white px-6 py-2 rounded-lg hover:bg-[#8B2FD9] transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <Text className="font-semibold text-gray-900 mb-4">Products</Text>
            <ul className="space-y-3">
              {footerLinks.Products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Text className="font-semibold text-gray-900 mb-4">Resources</Text>
            <ul className="space-y-3">
              {footerLinks.Resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Text className="font-semibold text-gray-900 mb-4 mt-6">Resources</Text>
            <ul className="space-y-3">
              {footerLinks.Content.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Text className="font-semibold text-gray-900 mb-4">Company</Text>
            <ul className="space-y-3">
              {footerLinks.Company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <Text className="text-sm text-gray-600">
            Copyright © 2015 - 2024 Realtime
          </Text>
          <div className="flex gap-4">
            <a
              href="#facebook"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Facebook"
            >
              <span className="text-gray-700 font-bold">f</span>
            </a>
            <a
              href="#twitter"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Twitter"
            >
              <span className="text-gray-700 font-bold">X</span>
            </a>
            <a
              href="#linkedin"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="LinkedIn"
            >
              <span className="text-gray-700 font-bold">in</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

