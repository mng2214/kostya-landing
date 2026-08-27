import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { company, nav, navDropdown } from "@/content";
import { cn } from "@/lib/utils";
import { TopBar } from "./TopBar";
import { Logo } from "./Logo";
import { BookButton } from "./BookButton";


const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative text-[15px] font-medium transition-colors",
    isActive ? "text-brand-600" : "text-ink hover:text-brand-600",
  );

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  // Any navigation closes both menus.
  useEffect(() => {
    setOpen(false);
    setDropdown(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!dropdown) return;
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setDropdown(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDropdown(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropdown]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isPagesActive = navDropdown.items.some((i) => i.to === pathname);

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <div
        className={cn(
          "border-b bg-white/95 backdrop-blur transition-shadow duration-300",
          scrolled
            ? "border-black/[0.07] shadow-[0_10px_30px_-24px_rgba(0,0,0,0.5)]"
            : "border-transparent",
        )}
      >
        <div className="container-page flex h-[74px] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdown((v) => !v)}
                aria-expanded={dropdown}
                aria-haspopup="true"
                className={cn(
                  "inline-flex items-center gap-1 text-[15px] font-medium transition-colors",
                  isPagesActive || dropdown
                    ? "text-brand-600"
                    : "text-ink hover:text-brand-600",
                )}
              >
                {navDropdown.label}
                <ChevronDown
                  className={cn(
                    "size-4 transition-transform duration-200",
                    dropdown && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute left-1/2 top-[calc(100%+16px)] w-60 -translate-x-1/2 overflow-hidden rounded-none border border-black/[0.07] bg-white p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.28)]"
                  >
                    {navDropdown.items.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block rounded-none px-3.5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:bg-brand-50 hover:text-brand-600"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            {/*
              Wrapped rather than given `hidden` directly: the button's own
              base class sets `inline-flex`, and Tailwind resolves same-property
              conflicts by stylesheet order, not class order.
            */}
            <div className="hidden lg:block">
              <BookButton />
            </div>

            <a
              href={company.phoneHref}
              className="hidden h-12 items-center gap-2.5 whitespace-nowrap rounded-[var(--radius-action)] bg-brand-500 px-6 text-[15px] font-semibold text-white shadow-[0_6px_20px_-6px_rgba(34,64,156,0.45)] transition-all hover:bg-brand-600 active:scale-[0.98] lg:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              {company.phone}
            </a>

            {/* Below lg the number collapses to an icon — calling is the
                single most likely action on a phone. */}
            <a
              href={company.phoneHref}
              aria-label={`Call ${company.phone}`}
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-action)] bg-brand-500 text-white shadow-[0_6px_20px_-8px_rgba(34,64,156,0.5)] transition-colors hover:bg-brand-600 lg:hidden"
            >
              <Phone className="size-[18px]" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-action)] border border-black/10 text-ink transition-colors hover:bg-black/[0.04] lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(86vw,360px)] flex-col bg-white p-6 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex size-11 items-center justify-center rounded-[var(--radius-action)] border border-black/10"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
                {[...nav, ...navDropdown.items].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "rounded-none px-4 py-3 text-[17px] font-medium transition-colors",
                        isActive
                          ? "bg-brand-50 text-brand-600"
                          : "text-ink hover:bg-black/[0.04]",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto space-y-3 border-t border-black/[0.07] pt-6">
                <a
                  href={company.phoneHref}
                  className="flex h-13 items-center justify-center gap-2 rounded-[var(--radius-action)] bg-brand-500 px-6 py-3.5 font-semibold text-white"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {company.phone}
                </a>
                <BookButton className="w-full" />
                <a
                  href={company.emailHref}
                  className="flex items-center justify-center rounded-[var(--radius-action)] border border-black/12 px-6 py-3.5 font-medium text-ink"
                >
                  {company.email}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
