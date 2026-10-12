"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "خانه", href: "/" },
  { label: "پروژه‌ها", href: "/projects" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="صفحه اصلی اینوستلی">
        <span className="brand-mark" aria-hidden="true">
          <span className="brand-bar brand-bar-small"></span>
          <span className="brand-bar brand-bar-large"></span>
        </span>

        <span className="brand-name">اینوستلی</span>
      </Link>

      <nav className="main-nav" aria-label="منوی اصلی">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive ? "active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link href="/login" className="button button-login">
        خروج
      </Link>
    </header>
  );
}
