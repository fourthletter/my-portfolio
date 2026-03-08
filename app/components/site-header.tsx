"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Bio" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

function getIsActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  if (href.startsWith("/#")) {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#b9c4cc]/90 bg-[#e8eaed]/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="text-sm font-semibold tracking-tight text-[#142635]">
          Di Luong
        </Link>
        <nav className="flex items-center gap-5 text-sm text-[#4c5a67]">
          {navItems.map((item) => {
            const isActive = getIsActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition ${
                  isActive
                    ? "font-semibold text-[#142635] underline decoration-2 decoration-[#d8a34a] underline-offset-8"
                    : "text-[#4c5a67] hover:text-[#142635]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
