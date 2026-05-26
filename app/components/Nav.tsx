export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#" className="nav-brand">Auxgens</a>
        <nav>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Our Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
        <a href="#contact" className="nav-cta">Contact Us</a>
      </div>
    </header>
  );
}
