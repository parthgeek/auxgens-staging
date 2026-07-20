"use client";

import { motion } from "framer-motion";
import { Counter, Stagger, staggerItem } from "./motion";

const stats = [
  { render: () => <Counter to={25} suffix="+" />, lbl: "Years of field experience" },
  { render: () => <>24/7</>, lbl: "Security operations coverage" },
  { render: () => <>Global</>, lbl: "Delivery model" },
  { render: () => <>ISO</>, lbl: "Compliance-first delivery" },
];

export default function Stats() {
  return (
    <section className="lx-stats">
      <div className="lx-wrap">
        <Stagger className="lx-stats-grid" gap={0.1}>
          {stats.map((s) => (
            <motion.div className="lx-stat" key={s.lbl} variants={staggerItem}>
              <span className="lx-stat-n lx-serif">{s.render()}</span>
              <span className="lx-stat-lbl">{s.lbl}</span>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
