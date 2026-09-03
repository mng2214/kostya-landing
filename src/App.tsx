import { Route, Routes } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CrispChat } from "@/components/CrispChat";
import { CrispPulse } from "@/components/CrispPulse";
import { CallbackProvider } from "@/components/CallbackModal";

import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import ServiceCategory from "@/pages/ServiceCategory";
import ServiceAreas from "@/pages/ServiceAreas";
import Book from "@/pages/Book";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <CallbackProvider>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[var(--radius-action)] focus:bg-brand-500 focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/book" element={<Book />} />
          <Route path="/:group" element={<ServiceCategory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <CrispChat />
      <CrispPulse />
    </CallbackProvider>
  );
}
