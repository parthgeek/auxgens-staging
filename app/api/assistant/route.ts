import { NextResponse } from "next/server";
import { systemPrompt } from "../../data/siteKnowledge";

export const runtime = "nodejs";

type Role = "user" | "assistant";

type IncomingMessage = {
  role: Role;
  content: string;
};

const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

function sanitiseMessages(value: unknown): IncomingMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item): item is IncomingMessage =>
        !!item &&
        typeof item === "object" &&
        (item as IncomingMessage).role !== undefined &&
        typeof (item as IncomingMessage).content === "string",
    )
    .filter((item) => item.role === "user" || item.role === "assistant")
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, MAX_CHARS),
    }))
    .filter((item) => item.content.length > 0)
    .slice(-MAX_MESSAGES);
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Assistant is not configured." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = sanitiseMessages((body as { messages?: unknown })?.messages);

  if (messages.length === 0) {
    return NextResponse.json({ error: "No message provided." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.3,
        max_tokens: 600,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "Assistant is unreachable right now." },
      { status: 502 },
    );
  }

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: "Assistant is unavailable right now." },
      { status: 502 },
    );
  }

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const reader = upstream.body.getReader();

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      let buffer = "";

      for (;;) {
        const { done, value } = await reader.read();

        if (done) {
          controller.close();
          return;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const parsed = JSON.parse(payload);
            const delta = parsed?.choices?.[0]?.delta?.content;
            if (typeof delta === "string" && delta.length > 0) {
              controller.enqueue(encoder.encode(delta));
            }
          } catch {
            // Partial or non-JSON chunk — skip it.
          }
        }
      }
    },
    cancel() {
      void reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
