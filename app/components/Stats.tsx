const stats = [
  { n: "25+", lbl: "Years of Field Experience" },
  { n: "24/7", lbl: "Security Operations Coverage" },
  { n: "3", lbl: "Global Delivery Regions" },
  { n: "ISO", lbl: "Compliance-first delivery model" },
];

export default function Stats() {
  return (
    <section className="stats">
      <div className="wrap">
        <div className="stats-grid anim">
          {stats.map((s) => (
            <div key={s.lbl} className="stat">
              <div className="stat-n">{s.n}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
