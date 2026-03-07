"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
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
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="text-sm font-semibold tracking-tight text-stone-900">
          Diluong Portfolio
        </Link>
        <nav className="flex items-center gap-5 text-sm text-stone-700">
          {navItems.map((item) => {
            const isActive = getIsActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition ${
                  isActive
                    ? "font-semibold text-stone-900 underline decoration-2 underline-offset-8"
                    : "text-stone-700 hover:text-stone-900"
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
