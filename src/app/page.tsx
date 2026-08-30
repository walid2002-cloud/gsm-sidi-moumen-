import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Levels } from "@/components/Levels";
import { Teachers } from "@/components/Teachers";
import { Location } from "@/components/Location";
import { FreeWeek } from "@/components/FreeWeek";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="contenu">
        <Hero />
        <Stats />
        <Levels />
        <Teachers />
        <Location />
        <FreeWeek />
        <Testimonials />
        <FAQ />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
