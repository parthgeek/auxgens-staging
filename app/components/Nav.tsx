import Image from "next/image";

export default function Nav() {
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
            <li><a href="/#home">Home</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/#about">About Us</a></li>
            <li><a href="/#contact">Contact Us</a></li>
          </ul>
        </nav>
        <a href="/#contact" className="nav-cta">Contact Us</a>
      </div>
    </header>
  );
}
