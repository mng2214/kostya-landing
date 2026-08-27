import { useSeo } from "@/lib/seo";
import { seo } from "@/content";
import { Button } from "@/components/Button";
import { BookButton } from "@/components/BookButton";

export default function NotFound() {
  useSeo({ ...seo.notFound, noindex: true });

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-[96px] font-extrabold leading-none text-brand-500 sm:text-[140px]">
        404
      </p>
      <h1 className="mt-4 text-[30px] font-semibold sm:text-[38px]">
        This page is out of service
      </h1>
      <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-muted">
        The link is broken, which is at least the one thing we cannot fix on
        site. Try the homepage, or have someone call you.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button to="/">Back to home</Button>
        <BookButton variant="outline" />
      </div>
    </section>
  );
}
