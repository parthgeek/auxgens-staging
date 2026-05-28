const brands = {
  rsa: {
    id: "rsa",
    name: "RSA Security",
    logo: (
      <>
        <span className="brand-logo-main">RSA</span>
        <span className="brand-logo-sub">SECURITY</span>
      </>
    ),
  },
  dell: {
    id: "dell",
    name: "Dell Technologies",
    logo: (
      <>
        <span className="brand-logo-dell-mark">DELL</span>
        <span className="brand-logo-sub">TECHNOLOGIES</span>
      </>
    ),
  },
  paloAlto: {
    id: "palo-alto",
    name: "Palo Alto Networks",
    logo: (
      <>
        <span className="brand-logo-pan-mark" />
        <span className="brand-logo-stack">
          <span>PALO ALTO</span>
          <span>NETWORKS</span>
        </span>
      </>
    ),
  },
  fortinet: {
    id: "fortinet",
    name: "Fortinet",
    logo: (
      <>
        <span className="brand-logo-fortinet-mark">
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className="brand-logo-main">FORTINET</span>
      </>
    ),
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft Security",
    logo: (
      <>
        <span className="brand-logo-ms-mark">
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className="brand-logo-stack">
          <span>MICROSOFT</span>
          <span>SECURITY</span>
        </span>
      </>
    ),
  },
};

const items = [
  brands.rsa,
  brands.dell,
  brands.rsa,
  brands.microsoft,
  brands.paloAlto,
  brands.fortinet,
  brands.microsoft,
];

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        {[0, 1].map((groupIndex) => (
          <div
            key={groupIndex}
            className="ticker-group"
            aria-hidden={groupIndex === 1 ? true : undefined}
          >
            {items.map((brand, i) => (
              <span
                key={`${brand.name}-${groupIndex}-${i}`}
                className="ticker-item"
                tabIndex={groupIndex === 1 ? -1 : 0}
              >
                <span className="ticker-label">{brand.name}</span>
                <span className={`ticker-logo ticker-logo-${brand.id}`} aria-hidden="true">
                  {brand.logo}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
