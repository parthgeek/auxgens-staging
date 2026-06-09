"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LogoLockup from "./LogoLockup";

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
        <LogoLockup
          href="/"
          className="nav-brand"
          logoClassName="nav-logo"
          taglineClassName="nav-tagline"
        />
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
