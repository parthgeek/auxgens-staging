const brands = {
  dell: {
    id: "dell",
    name: "Dell",
    logo: (
      <img className="brand-logo-img" src="/dell.png" alt="" loading="lazy" />
    ),
  },
  rsa: {
    id: "rsa",
    name: "RSA",
    logo: (
      <img className="brand-logo-img" src="/rsa.png" alt="" loading="lazy" />
    ),
  },
  ssrvm: {
    id: "ssrvm",
    name: "SSRVM",
    logo: (
      <img className="brand-logo-img" src="/ssrvm.png" alt="" loading="lazy" />
    ),
  },
  ibsfintech: {
    id: "ibsfintech",
    name: "IBSFINtech",
    logo: (
      <img className="brand-logo-img" src="/ibsfintech.png" alt="" loading="lazy" />
    ),
  },
  seceon: {
    id: "seceon",
    name: "Seceon",
    logo: (
      <img className="brand-logo-img" src="/seceon.png" alt="" loading="lazy" />
    ),
  },
  bankOfIndia: {
    id: "bank-of-india",
    name: "Bank Of India",
    logo: (
      <img className="brand-logo-img" src="/bank%20of%20india.png" alt="" loading="lazy" />
    ),
  },
};

const items = [
  brands.dell,
  brands.rsa,
  brands.ssrvm,
  brands.ibsfintech,
  brands.seceon,
  brands.bankOfIndia,
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
