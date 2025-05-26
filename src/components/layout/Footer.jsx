"use client";
import Button from "@/src/components/ui/Button";
import { motion } from "framer-motion";
import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <>
      <section className="py-16 bg-gradient-to-br from-[#C14524] to-[#D1A86A] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              MindBridgeSpace
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-xl mb-8 max-w-2xl mx-auto"
            >
              Plus qu un outil, une passerelle vers un accompagnement complet.
              <br />
              Créez, formez, accompagnez. Aujourd hui.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Button className="bg-white border-none text-[#C14524] hover:bg-gray-100">
                Démarrer gratuitement
              </Button>
              <Button className="border-white text-[#C14524] hover:bg-white hover:text-[#C14524]">
                Réserver un appel avec notre équipe
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>{" "}
      <footer className="bg-[#1F2937] text-white py-12 mt-16" id="contact">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold text-[#D1A86A] mb-2">
              MindBridge<span className="text-white">Space</span>
            </h3>
            <p className="text-sm text-gray-300">
              Une plateforme pour accompagner le bien-être et la réussite
              scolaire, personnelle et professionnelle.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#home" className="hover:text-[#D1A86A]">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#D1A86A]">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#training" className="hover:text-[#D1A86A]">
                  Formations
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D1A86A]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Phone size={16} /> +261 34 34 343 43
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> contact@mindbridgespace.fr
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} /> Paris, France
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a
                href="facebook.com"
                aria-label="Facebook"
                className="hover:text-[#D1A86A]"
              >
                <Facebook size={20} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-[#D1A86A]"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} MindBridgeSpace. Tous droits
          réservés.
        </div>
      </footer>
    </>
  );
};

export default Footer;
