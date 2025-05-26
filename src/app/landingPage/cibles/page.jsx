"use client";
import Button from "@/src/components/ui/Button";
import SectionTitle from "@/src/components/ui/SectionTitle";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
const Cibles = () => {
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
    <section className="py-16 bg-white" id="who">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="text-center mb-12">
            <SectionTitle centered>Pour Qui ?</SectionTitle>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div variants={fadeIn}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-[#C14524] py-4 px-6 text-white">
                  <h3 className="text-xl font-bold">ÉCOLES</h3>
                </div>

                <div className="p-6">
                  <p className="mb-4">Système de gestion scolaire complet :</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>
                        Cours, devoirs, bulletins, gestion des comportements
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Comptes élèves/parents/enseignants</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Espace thérapeutique intégré</span>
                    </li>
                  </ul>
                  {/* <Image
                    src={ecole}
                    alt="Centre de formation"
                    className="w-full h-7 rounded-md mb-6"
                  /> */}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-[#D1A86A] py-4 px-6 text-white">
                  <h3 className="text-xl font-bold">CENTRES DE FORMATION</h3>
                </div>
                <div className="p-6">
                  <p className="mb-4">
                    Plateforme agile pour vos modules courts ou longs :
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#D1A86A] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Organisation par session</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#D1A86A] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Suivi des apprenants</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#D1A86A] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Génération automatique de certificats</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-[#A6A6A6] py-4 px-6 text-white">
                  <h3 className="text-xl font-bold">
                    PROFESSIONNELS DU BIEN-ÊTRE
                  </h3>
                </div>
                <div className="p-6">
                  <p className="mb-4">Thérapeutes, coachs, praticiens...</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#A6A6A6] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Prise de rendez-vous simplifiée</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#A6A6A6] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Fiches clients & ressources partagées</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#A6A6A6] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Consultations confidentielles en visio</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeIn} className="text-center mt-12">
            <Button primary>Choisissez votre profil et lancez-vous</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cibles;
