"use client";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import SanteBienEtre from "./landingPage/bien-etre-sante/page";
import Cibles from "./landingPage/cibles/page";
import Faq from "./landingPage/faq/page";
import Fonctionnalités from "./landingPage/fonctionnalités/page";
import Hero from "./landingPage/home/page";
import Tarifs from "./landingPage/tarifs/page";
import Temoignages from "./landingPage/temoignages/page";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main>
        {/* Hero Section */}
        <Hero />
        {/*  Pourquoi MindBridge Space ? */}

        {/* Section 2 - Pour Qui ? */}
        <Cibles />

        {/* Section 3 - Fonctionnalités Clés */}
        <Fonctionnalités />
        {/* Section 4 - L'Expérience Thérapeutique Intégrée */}

        <SanteBienEtre />
        {/* Section 5 - Tarification Flexible */}
        <Tarifs />
        {/* Section 6 - Témoignages */}
        <Temoignages />
        {/* Section 7 - FAQ */}
        <Faq />
      </main>
      {/* Section 8 - Appel Final à l'Action */}

      <Footer />
    </div>
  );
}
