export default function CTA() {
  return (
    <section className="cta" id="contact">
      <div className="cta-grid">
        <div className="anim">
          <h2>
            Your next breach<br />
            attempt doesn&rsquo;t<br />
            wait for <em>Monday.</em>
          </h2>
        </div>
        <div className="anim d1">
          <p className="cta-desc">
            Let&rsquo;s talk about where your exposure is — and how Auxgens closes the gap before adversaries find it. Our team responds within one business day.
          </p>
          <div className="cta-btns">
            <a href="mailto:sales@auxgens.net" className="btn-lime">Email Us Now</a>
            <a href="tel:+1-425-555-0123" className="btn-ghost-light">Call Us</a>
          </div>
          <div className="cta-meta">
            <span>sales@auxgens.net</span>
            <span>Bengaluru, India</span>
            <span>Bothell, WA 98012</span>
          </div>
        </div>
      </div>
    </section>
  );
}
