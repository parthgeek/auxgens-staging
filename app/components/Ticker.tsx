const items = [
  "RSA Security",
  "Dell Technologies",
  "RSA Security",
  "Dell Technologies",
  "Palo Alto Networks",
  "Fortinet",
  "Microsoft Security",
];

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        {[...items, ...items].map((name, i) => (
          <span key={i} className="ticker-item">{name}</span>
        ))}
      </div>
    </div>
  );
}
