import { useState } from "react";
import { AlertCircle, CheckCircle2, Clock, Loader2, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { allServices, company, contactSection } from "@/content";
import { FormConsent } from "@/components/FormConsent";
import { submitLead, type Lead } from "@/lib/leads";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<keyof Lead, string>>;

const empty: Lead = { name: "", email: "", phone: "", service: "", message: "" };

function validate(v: Lead): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please tell us your name.";
  if (!v.email.trim()) e.email = "We need an email to reply to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "That email address doesn't look right.";
  if (v.phone.trim() && v.phone.replace(/\D/g, "").length < 10)
    e.phone = "A phone number needs at least 10 digits.";
  if (!v.service) e.service = "Pick the closest service.";
  if (v.message.trim().length < 10)
    e.message = "A sentence or two about the problem helps us quote it.";
  return e;
}

const fieldBase =
  "w-full rounded-none border bg-white px-4 py-3.5 text-[15px] outline-none transition-colors placeholder:text-ink-muted/50";

export function ContactForm() {
  const [values, setValues] = useState<Lead>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  function set<K extends keyof Lead>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.focus();
      return;
    }

    setStatus("submitting");
    setServerError("");
    const res = await submitLead(values);

    if (res.ok) {
      setStatus("success");
      setValues(empty);
    } else {
      setStatus("error");
      setServerError(res.error);
    }
  }

  const invalid = (k: keyof Lead) => Boolean(errors[k]);
  const ring = (k: keyof Lead) =>
    invalid(k)
      ? "border-red-400 focus:border-red-500"
      : "border-black/12 focus:border-brand-500";

  return (
    <section id="contact" className="w-full">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal>
          <h2 className="type-title text-[32px] sm:text-[42px] max-w-sm">{contactSection.title}</h2>
          <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-ink-muted">
            {contactSection.body}
          </p>

          <ul className="mt-9 space-y-5">
            <li>
              <a
                href={company.phoneHref}
                className="group flex items-start gap-4"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-none bg-brand-50 text-brand-600">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                    Call
                  </span>
                  <span className="block text-[17px] font-semibold transition-colors group-hover:text-brand-600">
                    {company.phone}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={company.mapHref}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-start gap-4"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-none bg-brand-50 text-brand-600">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                    Visit
                  </span>
                  <span className="block text-[17px] font-semibold transition-colors group-hover:text-brand-600">
                    {company.address}
                  </span>
                </span>
              </a>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-none bg-brand-50 text-brand-600">
                <Clock className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                  Hours
                </span>
                <span className="block text-[15px] font-medium">
                  {company.hours}
                </span>
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-[var(--radius-panel)] border border-black/[0.08] bg-surface p-6 sm:p-9">
            {status === "success" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="inline-flex size-16 items-center justify-center rounded-full bg-brand-500 text-white">
                  <CheckCircle2 className="size-8" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[24px] font-semibold">
                  Request received
                </h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-muted">
                  We'll come back with a time window within a couple of hours.
                  For anything urgent, call {company.phone}.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-7 rounded-[var(--radius-action)] border border-black/12 px-6 py-3 text-[14px] font-semibold transition-colors hover:border-brand-500 hover:text-brand-600"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" error={errors.name} htmlFor="name" required>
                    <input
                      id="name"
                      name="name"
                      data-invalid={invalid("name")}
                      aria-invalid={invalid("name")}
                      value={values.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Jane Kowalski"
                      className={cn(fieldBase, ring("name"))}
                    />
                  </Field>

                  <Field label="Email" error={errors.email} htmlFor="email" required>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      data-invalid={invalid("email")}
                      aria-invalid={invalid("email")}
                      value={values.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="jane@example.com"
                      className={cn(fieldBase, ring("email"))}
                    />
                  </Field>

                  <Field label="Phone" error={errors.phone} htmlFor="phone">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      data-invalid={invalid("phone")}
                      aria-invalid={invalid("phone")}
                      value={values.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="847 555-0123"
                      className={cn(fieldBase, ring("phone"))}
                    />
                  </Field>

                  <Field label="Service" error={errors.service} htmlFor="service" required>
                    <select
                      id="service"
                      name="service"
                      data-invalid={invalid("service")}
                      aria-invalid={invalid("service")}
                      value={values.service}
                      onChange={(e) => set("service", e.target.value)}
                      className={cn(
                        fieldBase,
                        ring("service"),
                        "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235b5f6b%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11",
                        !values.service && "text-ink-muted/50",
                      )}
                    >
                      <option value="">Choose a service</option>
                      {allServices.map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Something else">Something else</option>
                    </select>
                  </Field>
                </div>

                <Field label="Message" error={errors.message} htmlFor="message" required>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    data-invalid={invalid("message")}
                    aria-invalid={invalid("message")}
                    value={values.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="The furnace is short cycling and throwing a code…"
                    className={cn(fieldBase, ring("message"), "resize-y")}
                  />
                </Field>

                {status === "error" && (
                  <p
                    role="alert"
                    className="flex items-start gap-2.5 rounded-none bg-red-50 px-4 py-3.5 text-[14px] text-red-700"
                  >
                    <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-[var(--radius-action)] bg-brand-500 px-7 text-[16px] font-semibold text-white transition-all hover:bg-brand-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    "Request a callback"
                  )}
                </button>

                <FormConsent
                  note="No spam, no call centre. We reply from a real inbox."
                  action="sending this request"
                />
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[12px] font-bold uppercase tracking-[0.1em] text-ink-muted"
      >
        {label}
        {required && <span className="ml-1 text-brand-500">*</span>}
      </label>
      {children}
      <p aria-live="polite" className="mt-1.5 min-h-[18px] text-[13px] text-red-600">
        {error ?? ""}
      </p>
    </div>
  );
}
