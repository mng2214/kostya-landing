import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { crisp as copy, company } from "@/content";
import { isConfigured, loadCrisp } from "@/lib/crisp";

type Msg = { from: "them" | "me"; text: string };

/**
 * Stand-in for the Crisp launcher. Renders only when Crisp is NOT configured;
 * once VITE_CRISP_WEBSITE_ID exists, the real widget loads instead.
 */
export function CrispChat() {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "them", text: copy.fallbackGreeting },
  ]);

  useEffect(() => {
    if (isConfigured) loadCrisp();
  }, []);

  if (isConfigured) return null;

  function send() {
    const text = draft.trim();
    if (!text) return;
    setMsgs((m) => [...m, { from: "me", text }]);
    setDraft("");
    window.setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          from: "them",
          text: `This is a placeholder chat — Crisp is not connected yet. Call ${company.phone} and we'll pick up.`,
        },
      ]);
    }, 700);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[420px] w-[min(88vw,340px)] flex-col overflow-hidden rounded-none border border-black/[0.08] bg-white shadow-[0_30px_70px_-25px_rgba(0,0,0,0.45)]"
            role="dialog"
            aria-label="Live chat"
          >
            <div className="flex items-center gap-3 bg-brand-500 px-5 py-4 text-white">
              <div className="flex size-9 items-center justify-center rounded-full bg-white/20 text-[13px] font-bold">
                K
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold">
                  {copy.fallbackName}
                </p>
                <p className="truncate text-[12px] text-white/75">
                  {copy.fallbackStatus}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 transition-colors hover:bg-white/15"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-surface p-4">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.from === "me"
                      ? "ml-auto max-w-[80%] rounded-none rounded-br-md bg-brand-500 px-3.5 py-2.5 text-[14px] leading-snug text-white"
                      : "mr-auto max-w-[85%] rounded-none rounded-bl-md bg-white px-3.5 py-2.5 text-[14px] leading-snug text-ink shadow-sm"
                  }
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-black/[0.07] bg-white p-3">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type a message…"
                aria-label="Message"
                className="h-10 min-w-0 flex-1 rounded-[var(--radius-action)] bg-surface px-4 text-[14px] outline-none placeholder:text-ink-muted/60"
              />
              <button
                type="button"
                onClick={send}
                aria-label="Send message"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-action)] bg-brand-500 text-white transition-colors hover:bg-brand-600"
              >
                <Send className="size-4" aria-hidden="true" />
              </button>
            </div>

            <p className="bg-white pb-2.5 text-center text-[10px] uppercase tracking-[0.12em] text-ink-muted/60">
              Placeholder · Crisp not connected
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Pulsing rings sit behind the button and never intercept clicks. */}
        {!open && !everOpened && (
          <span aria-hidden="true" className="pointer-events-none absolute inset-0">
            <span className="chat-ring absolute inset-[6px] rounded-full bg-brand-500" />
            <span className="chat-ring chat-ring-delayed absolute inset-[6px] rounded-full bg-brand-500" />
          </span>
        )}

        <button
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            setEverOpened(true);
          }}
          aria-label={open ? "Close chat" : "Open chat"}
          className="relative inline-flex size-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-[0_12px_30px_-8px_rgba(34,64,156,0.55)] transition-transform hover:scale-105 active:scale-95"
        >
          {open ? (
            <X className="size-6" aria-hidden="true" />
          ) : (
            <>
              <MessageCircle className="size-6" aria-hidden="true" />
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[#34A853] text-[10px] font-bold ring-2 ring-white">
                1
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
