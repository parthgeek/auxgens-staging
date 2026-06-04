"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Our Services", href: "/services" },
  { label: "About Us", href: "/#about" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const isActive = (href: string) => {
    if (href === "/services") {
      return pathname === "/services";
    }

    if (pathname !== "/") {
      return false;
    }

    if (href === "/#home") {
      return hash === "" || hash === "#home";
    }

    return hash === href.slice(1);
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="/" className="nav-brand" aria-label="Auxgens home">
          <Image
            src="/logo_3d.gif"
            alt="Auxgens"
            width={360}
            height={360}
            className="nav-logo"
            priority
            unoptimized
          />
        </a>
        <nav>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="/#contact" className="nav-cta">Contact Us</a>
      </div>
    </header>
  );
}
