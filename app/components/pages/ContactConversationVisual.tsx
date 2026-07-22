"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

function ContactConversationVisual() {
  const reduce = useReducedMotion();

  return (
    <motion.figure
      className="lx-conversation"
      aria-label="Example contact conversation. A client asks for SOC 2 readiness and a secure product review. Auxgens routes the enquiry to governance, risk, compliance, and application security specialists."
      initial={reduce ? false : { opacity: 0, y: 24, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 74, damping: 19, delay: 0.3 }}
    >
      <div className="lx-conversation-note" aria-hidden="true">
        <span>Response window</span>
        <strong>Within one business day</strong>
      </div>

      <div className="lx-conversation-shell">
        <header className="lx-conversation-head">
          <div className="lx-conversation-brand" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path d="M16 3.5 27 8v7.3c0 7.4-4.2 12.8-11 15.8-6.8-3-11-8.4-11-15.8V8l11-4.5Z" />
              <path d="m10.8 16.7 3.1 3.1 7.1-7.7" />
            </svg>
          </div>
          <div>
            <strong>Auxgens response desk</strong>
            <span><i aria-hidden="true" /> Secure enquiry line</span>
          </div>
          <span className="lx-conversation-code">AUX / 01</span>
        </header>

        <div className="lx-conversation-thread">
          <div className="lx-conversation-date"><span>Example enquiry</span></div>

          <div className="lx-conversation-message lx-conversation-message-client">
            <span className="lx-conversation-sender">You</span>
            <p>We need SOC 2 readiness and a secure product review.</p>
            <small>Enquiry received</small>
          </div>

          <div className="lx-conversation-typing" aria-hidden="true">
            <span /><span /><span />
          </div>

          <div className="lx-conversation-message lx-conversation-message-team">
            <span className="lx-conversation-sender">Auxgens</span>
            <p>You&rsquo;re in the right place. We&rsquo;ll bring GRC and AppSec into one conversation.</p>
            <small>Human-led response</small>
          </div>

          <div className="lx-conversation-route">
            <div>
              <span>Specialists matched</span>
              <strong>Enquiry ready for review</strong>
            </div>
            <ul aria-label="Matched specialists">
              <li>GRC</li>
              <li>Application security</li>
            </ul>
            <span className="lx-conversation-check" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="m6 12.5 3.5 3.5L18 7.5" /></svg>
            </span>
          </div>
        </div>

        <footer className="lx-conversation-footer">
          <span>Asia</span><i aria-hidden="true" />
          <span>EMEA</span><i aria-hidden="true" />
          <span>United States</span>
          <strong>Conversation ready</strong>
        </footer>
      </div>

      <figcaption>
        <span>From question to specialist</span>
        <strong>Clear routing. Human response.</strong>
      </figcaption>
    </motion.figure>
  );
}

export default memo(ContactConversationVisual);
