"use client";

import Button from "@/src/components/ui/Button";
import SectionTitle from "@/src/components/ui/SectionTitle";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const Tarifs = () => {
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
    <section className="py-16 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="text-center mb-12">
            <SectionTitle centered>Tarification Flexible</SectionTitle>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez un plan selon votre profil
            </p>
          </motion.div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={fadeIn}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 h-full flex flex-col">
              <div className="bg-[#C14524] py-6 px-6 text-white text-center">
                <h3 className="text-2xl font-bold">École</h3>
              </div>
              <div className="p-6 flex-grow">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">€XX</span>
                  <span className="text-gray-600">/mois</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                    />
                    <span>Offre complète</span>
                  </li>
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                    />
                    <span>Élèves illimités</span>
                  </li>
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                    />
                    <span>Espace bien-être inclus</span>
                  </li>
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                    />
                    <span>Abonnement mensuel ou annuel</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50">
                <Button primary className="w-full">
                  Choisir ce plan
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 h-full flex flex-col">
              <div className="bg-[#D1A86A] py-6 px-6 text-white text-center">
                <h3 className="text-2xl font-bold">Centre de formation</h3>
              </div>
              <div className="p-6 flex-grow">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">€XX</span>
                  <span className="text-gray-600">/mois</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-[#D1A86A] mr-2 mt-1 flex-shrink-0"
                    />
                    <span>Modules de formations illimités</span>
                  </li>
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-[#D1A86A] mr-2 mt-1 flex-shrink-0"
                    />
                    <span>Certificats automatiques</span>
                  </li>
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-[#D1A86A] mr-2 mt-1 flex-shrink-0"
                    />
                    <span>Support aux apprenants</span>
                  </li>
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-[#D1A86A] mr-2 mt-1 flex-shrink-0"
                    />
                    <span>Abonnement mensuel</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50">
                <Button primary className="w-full">
                  Choisir ce plan
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 h-full flex flex-col">
              <div className="bg-[#A6A6A6] py-6 px-6 text-white text-center">
                <h3 className="text-2xl font-bold">
                  Professionnel de la Santé
                </h3>
              </div>
              <div className="p-6 flex-grow">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">€XX</span>
                  <span className="text-gray-600">/mois</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-[#A6A6A6] mr-2 mt-1 flex-shrink-0"
                    />
                    <span>Gestion des rendez-vous</span>
                  </li>
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-[#A6A6A6] mr-2 mt-1 flex-shrink-0"
                    />
                    <span>Dossiers clients sécurisés</span>
                  </li>
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-[#A6A6A6] mr-2 mt-1 flex-shrink-0"
                    />
                    <span>Consultation en ligne</span>
                  </li>
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-[#A6A6A6] mr-2 mt-1 flex-shrink-0"
                    />
                    <span>Abonnement mensuel</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50">
                <Button primary className="w-full">
                  Choisir ce plan
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Tarifs;
