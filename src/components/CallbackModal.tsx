import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Loader2, PhoneCall, X } from "lucide-react";
import { allServices, company } from "@/content";
import {
  CALLBACK_SLOTS,
  requestCallback,
  type CallbackRequest,
} from "@/lib/callback";
import { cn } from "@/lib/utils";

type Ctx = { open: (topic?: string) => void; close: () => void };
const CallbackContext = createContext<Ctx | null>(null);

export function useCallbackModal() {
  const ctx = useContext(CallbackContext);
  if (!ctx)
    throw new Error("useCallbackModal must be used inside <CallbackProvider>");
  return ctx;
}

type Status = "idle" | "submitting" | "success" | "error";

export function CallbackProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState("");

  const open = useCallback((t?: string) => {
    setTopic(t ?? "");
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <CallbackContext.Provider value={value}>
      {children}
      <CallbackModal isOpen={isOpen} onClose={close} initialTopic={topic} />
    </CallbackContext.Provider>
  );
}

function CallbackModal({
  isOpen,
  onClose,
  initialTopic,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialTopic: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [when, setWhen] = useState<string>(CALLBACK_SLOTS[0].id);
  const [topic, setTopic] = useState(initialTopic);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [status, setStatus] = useState<Status>("idle");
  const [eta, setEta] = useState(15);
  const [serverError, setServerError] = useState("");

  // Reset to a clean sheet each time the modal is opened.
  useEffect(() => {
    if (!isOpen) return;
    setTopic(initialTopic);
    setErrors({});
    setStatus("idle");
    setServerError("");
  }, [isOpen, initialTopic]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found: typeof errors = {};
    if (!name.trim()) found.name = "We need a name to ask for.";
    const digits = phone.replace(/\D/g, "");
    if (!digits) found.phone = "A number is required — that's what we call.";
    else if (digits.length < 10) found.phone = "That number looks too short.";
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("submitting");
    const payload: CallbackRequest = { name, phone, when, topic };
    const res = await requestCallback(payload);

    if (res.ok) {
      setEta(res.etaMinutes);
      setStatus("success");
      setName("");
      setPhone("");
    } else {
      setServerError(res.error);
      setStatus("error");
    }
  }

  const inputCls = (bad?: string) =>
    cn(
      "w-full rounded-none border bg-white px-4 py-3.5 text-[15px] outline-none transition-colors placeholder:text-ink-muted/50",
      bad ? "border-red-400 focus:border-red-500" : "border-black/12 focus:border-brand-500",
    );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="callback-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[460px] overflow-hidden rounded-t-[28px] bg-white sm:rounded-[28px]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 inline-flex size-9 items-center justify-center rounded-[var(--radius-action)] text-ink-muted transition-colors hover:bg-black/[0.06]"
            >
              <X className="size-4" aria-hidden="true" />
            </button>

            {status === "success" ? (
              <div className="flex flex-col items-center px-7 py-14 text-center">
                <span className="inline-flex size-16 items-center justify-center rounded-full bg-brand-500 text-white">
                  <PhoneCall className="size-7" aria-hidden="true" />
                </span>
                <h2 id="callback-title" className="mt-6 text-[24px] font-semibold">
                  A tech will call you back
                </h2>
                <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink-muted">
                  Expect a call within about {eta} minutes. If you'd rather not
                  wait, dial {company.phone}.
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-ink-muted/60">
                  Stub — no call is scheduled
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-7 rounded-[var(--radius-action)] bg-brand-500 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-600"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="px-7 pb-8 pt-9">
                <span className="inline-flex size-12 items-center justify-center rounded-none bg-brand-50 text-brand-600">
                  <PhoneCall className="size-5" aria-hidden="true" />
                </span>
                <h2 id="callback-title" className="mt-5 text-[24px] font-semibold">
                  Request a call
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                  Leave a number and a tech calls you — no waiting on hold.
                </p>

                <div className="mt-7 space-y-4">
                  <div>
                    <label
                      htmlFor="cb-name"
                      className="mb-2 block text-[12px] font-bold uppercase tracking-[0.1em] text-ink-muted"
                    >
                      Name <span className="text-brand-500">*</span>
                    </label>
                    <input
                      id="cb-name"
                      value={name}
                      aria-invalid={Boolean(errors.name)}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors((v) => ({ ...v, name: undefined }));
                      }}
                      placeholder="Jane Kowalski"
                      className={inputCls(errors.name)}
                    />
                    <p className="mt-1.5 min-h-[18px] text-[13px] text-red-600">
                      {errors.name ?? ""}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="cb-phone"
                      className="mb-2 block text-[12px] font-bold uppercase tracking-[0.1em] text-ink-muted"
                    >
                      Phone <span className="text-brand-500">*</span>
                    </label>
                    <input
                      id="cb-phone"
                      type="tel"
                      value={phone}
                      aria-invalid={Boolean(errors.phone)}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setErrors((v) => ({ ...v, phone: undefined }));
                      }}
                      placeholder="847 555-0123"
                      className={inputCls(errors.phone)}
                    />
                    <p className="mt-1.5 min-h-[18px] text-[13px] text-red-600">
                      {errors.phone ?? ""}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="cb-topic"
                      className="mb-2 block text-[12px] font-bold uppercase tracking-[0.1em] text-ink-muted"
                    >
                      What's the job?
                    </label>
                    <select
                      id="cb-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className={cn(inputCls(), "appearance-none pr-11", !topic && "text-ink-muted/50")}
                    >
                      <option value="">Not sure yet</option>
                      {allServices.map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <fieldset>
                    <legend className="mb-2 block text-[12px] font-bold uppercase tracking-[0.1em] text-ink-muted">
                      When should we call?
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                      {CALLBACK_SLOTS.map((slot) => (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setWhen(slot.id)}
                          aria-pressed={when === slot.id}
                          className={cn(
                            "rounded-none border px-4 py-3 text-left transition-colors",
                            when === slot.id
                              ? "border-brand-500 bg-brand-50"
                              : "border-black/12 hover:border-black/25",
                          )}
                        >
                          <span
                            className={cn(
                              "block text-[14px] font-semibold",
                              when === slot.id && "text-brand-600",
                            )}
                          >
                            {slot.label}
                          </span>
                          <span className="mt-0.5 block text-[12px] text-ink-muted">
                            {slot.hint}
                          </span>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-5 flex items-start gap-2.5 rounded-none bg-red-50 px-4 py-3.5 text-[14px] text-red-700"
                  >
                    <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-7 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-[var(--radius-action)] bg-brand-500 text-[16px] font-semibold text-white transition-all hover:bg-brand-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Requesting…
                    </>
                  ) : (
                    "Call me back"
                  )}
                </button>

                <p className="mt-3 text-center text-[12px] text-ink-muted">
                  We only use this number to call you about the job.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
