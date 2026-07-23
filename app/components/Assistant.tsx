"use client";

import Link from "next/link";
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";

type Role = "user" | "assistant";

type Message = {
  id: string;
  role: Role;
  content: string;
};

const GREETING =
  "Hi, I'm **Aux** — the Auxgens assistant. Ask me about our services, compliance work, or the free self-assessment questionnaires.";

const SUGGESTIONS = [
  "What services do you offer?",
  "How does SOC as a Service work?",
  "Help me get ISO 27001 ready",
  "Which questionnaire should I start with?",
];

const STORAGE_KEY = "auxgens-assistant-thread";
const MAX_INPUT = 2000;

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

/* ── Tiny markdown renderer: **bold**, *italic*, internal /paths ── */

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*|(\/[a-z0-9-]+(?:\/[a-z0-9-]+)*)/gi;
  let cursor = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }

    const key = `${keyPrefix}-${index++}`;

    if (match[1] !== undefined) {
      nodes.push(<strong key={key}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      nodes.push(<em key={key}>{match[2]}</em>);
    } else if (match[3] !== undefined) {
      const href = match[3].replace(/[.,;:)]+$/, "");
      nodes.push(
        <Link key={key} href={href} className="ax-link">
          {href}
        </Link>,
      );
    }

    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

function renderContent(text: string) {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (bullets.length === 0) return;
    const items = bullets;
    bullets = [];
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="ax-bullets">
        {items.map((item, itemIndex) => (
          <li key={itemIndex}>{renderInline(item, `li-${blocks.length}-${itemIndex}`)}</li>
        ))}
      </ul>,
    );
  };

  lines.forEach((line, lineIndex) => {
    const trimmed = line.trim();
    const bullet = trimmed.match(/^[-*•]\s+(.*)$/);

    if (bullet) {
      bullets.push(bullet[1]);
      return;
    }

    flushBullets();

    if (trimmed.length === 0) return;

    blocks.push(
      <p key={`p-${lineIndex}`}>{renderInline(trimmed, `p-${lineIndex}`)}</p>,
    );
  });

  flushBullets();

  return blocks;
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unread, setUnread] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* Restore thread */
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setMessages(JSON.parse(stored) as Message[]);
    } catch {
      // Ignore unreadable storage.
    }
  }, []);

  /* Persist thread */
  useEffect(() => {
    if (messages.length === 0) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      // Storage full or blocked — non-fatal.
    }
  }, [messages]);

  /* Keep pinned to the latest message */
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, busy, open]);

  /* Focus on open, close on Escape */
  useEffect(() => {
    if (!open) return;
    setUnread(false);
    inputRef.current?.focus();

    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim().slice(0, MAX_INPUT);
      if (!text || busy) return;

      setError(null);
      setInput("");

      const history = [...messages, { id: makeId(), role: "user" as const, content: text }];
      const replyId = makeId();

      setMessages([...history, { id: replyId, role: "assistant", content: "" }]);
      setBusy(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            messages: history.map(({ role, content }) => ({ role, content })),
          }),
        });

        if (!response.ok || !response.body) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error ?? "The assistant is unavailable right now.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let answer = "";

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          answer += decoder.decode(value, { stream: true });
          setMessages((current) =>
            current.map((message) =>
              message.id === replyId ? { ...message, content: answer } : message,
            ),
          );
        }

        if (answer.trim().length === 0) {
          throw new Error("Empty response from the assistant.");
        }

        if (!open) setUnread(true);
      } catch (caught) {
        if ((caught as Error).name === "AbortError") return;

        setMessages((current) => current.filter((message) => message.id !== replyId));
        setError(
          (caught as Error).message ||
            "Something went wrong. Email contact@auxgens.net and the team will help.",
        );
      } finally {
        abortRef.current = null;
        setBusy(false);
      }
    },
    [busy, messages, open],
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void send(input);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send(input);
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setBusy(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Non-fatal.
    }
  };

  const streaming = busy && messages.at(-1)?.role === "assistant";
  const waiting = streaming && messages.at(-1)?.content.length === 0;

  return (
    <Fragment>
      <button
        type="button"
        className={`ax-launcher${open ? " is-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="auxgens-assistant"
        aria-label={open ? "Close the Auxgens assistant" : "Open the Auxgens assistant"}
      >
        <span className="ax-launcher-icon" aria-hidden="true">
          {open ? (
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
              <path d="M3.4 9.4a6.6 6.6 0 0 1 13.2 0c0 3.6-2.95 6.6-6.6 6.6H3.4l1.5-2.2a6.5 6.5 0 0 1-1.5-4.4Z" />
              <circle cx="7.3" cy="9.4" r=".85" fill="currentColor" stroke="none" />
              <circle cx="10" cy="9.4" r=".85" fill="currentColor" stroke="none" />
              <circle cx="12.7" cy="9.4" r=".85" fill="currentColor" stroke="none" />
            </svg>
          )}
        </span>
        {unread && !open ? <span className="ax-launcher-dot" aria-hidden="true" /> : null}
      </button>

      <section
        id="auxgens-assistant"
        className={`ax-panel${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-label="Auxgens virtual assistant"
        hidden={!open}
      >
        <header className="ax-head">
          <div className="ax-head-id">
            <span className="ax-avatar" aria-hidden="true">
              A
            </span>
            <span>
              <span className="ax-head-name">Aux</span>
              <span className="ax-head-sub">Auxgens virtual assistant</span>
            </span>
          </div>
          <div className="ax-head-actions">
            {messages.length > 0 ? (
              <button type="button" className="ax-ghost" onClick={reset}>
                Clear
              </button>
            ) : null}
            <button
              type="button"
              className="ax-ghost ax-close"
              onClick={() => setOpen(false)}
              aria-label="Close the assistant"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>
        </header>

        <div className="ax-scroll" ref={scrollRef}>
          <div className="ax-msg ax-msg-assistant">
            <div className="ax-bubble">{renderContent(GREETING)}</div>
          </div>

          {messages.map((message) => (
            <div key={message.id} className={`ax-msg ax-msg-${message.role}`}>
              <div className="ax-bubble">
                {message.content.length > 0 ? (
                  renderContent(message.content)
                ) : (
                  <span className="ax-typing" aria-label="Aux is typing">
                    <i />
                    <i />
                    <i />
                  </span>
                )}
              </div>
            </div>
          ))}

          {messages.length === 0 ? (
            <div className="ax-suggest">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="ax-chip"
                  onClick={() => void send(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}

          {error ? (
            <p className="ax-error" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <form className="ax-compose" onSubmit={onSubmit}>
          <textarea
            ref={inputRef}
            className="ax-input"
            value={input}
            onChange={(event) => setInput(event.target.value.slice(0, MAX_INPUT))}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Ask about our services…"
            aria-label="Message the Auxgens assistant"
            disabled={busy}
          />
          <button
            type="submit"
            className="ax-send"
            disabled={busy || input.trim().length === 0}
            aria-label="Send message"
          >
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 9h11M9.5 4.5 14 9l-4.5 4.5" />
            </svg>
          </button>
        </form>

        <p className="ax-foot">
          {waiting ? "Aux is thinking…" : "AI answers may be imperfect — confirm details with "}
          {waiting ? null : <Link href="/contact-us">our team</Link>}
        </p>
      </section>
    </Fragment>
  );
}
