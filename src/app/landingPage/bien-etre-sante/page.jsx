"use client";
import therapy from "@/src/assets/svg/therapy.svg";
import Button from "@/src/components/ui/Button";
import SectionTitle from "@/src/components/ui/SectionTitle";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
export default function SanteBienEtre() {
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
      <section className="py-16 bg-gray-50" id="wellness">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <div className="flex flex-col md:flex-row items-center">
              <motion.div variants={fadeIn} className="md:w-1/2 mb-8 md:mb-0">
                <SectionTitle>Expérience Thérapeutique Intégrée</SectionTitle>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="bg-[#D1A86A] rounded-full p-1 mr-3 mt-1">
                      <Check size={16} className="text-white" />
                    </div>
                    <span className="text-lg">
                      Espace sécurisé pour le suivi des élèves, apprenants et
                      clients
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#D1A86A] rounded-full p-1 mr-3 mt-1">
                      <Check size={16} className="text-white" />
                    </div>
                    <span className="text-lg">
                      Ressources sur le développement personnel et la santé
                      mentale
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#D1A86A] rounded-full p-1 mr-3 mt-1">
                      <Check size={16} className="text-white" />
                    </div>
                    <span className="text-lg">
                      Calendrier intégré, notifications et fiches de suivi
                    </span>
                  </li>
                </ul>
                <Button>Découvrir l&apos;espace bien-être</Button>
              </motion.div>
              <motion.div variants={fadeIn} className="md:ml-20">
                <Image
                  src={therapy}
                  alt="Expérience thérapeutique"
                  className="rounded-lg"
                  width={400}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
