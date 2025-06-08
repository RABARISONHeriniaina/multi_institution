"use client";
import onlineLearning from "@/src/assets/svg/onlineLearning.svg";
import Button from "@/src/components/ui/Button";
import Card from "@/src/components/ui/Card";
import SectionTitle from "@/src/components/ui/SectionTitle";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Hero = () => {

  const router = useRouter();

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

  const registerInstitution = () => {
    router.push("/institutions/register");
  };

  return (
    <>
      <section
        id="home"
        className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col md:flex-row items-center"
          >
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1
                variants={fadeIn}
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              >
                <span className="text-[#C14524]">MindBridge</span>
                <span className="text-[#D1A86A]">Space</span>
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl text-gray-600 mb-8"
              >
                Connecter l&apos;éducation, la santé et le bien-être, dans un
                même espace. Une plateforme numérique pour les écoles, centres
                de formation modulaires et professionnels de la santé et du
                bien-être.
              </motion.p>
              <motion.p
                variants={fadeIn}
                className="text-lg text-gray-600 mb-8"
              >
                Structurez, enseignez, accompagnez... tout en ligne.
              </motion.p>
              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <Button onClick={registerInstitution} primary>Créer votre espace</Button>
                <Button>Demander une démonstration</Button>
              </motion.div>
            </div>
            <motion.div variants={fadeIn} className="md:w-1/2">
              <div className="relative w-full h-64 md:h-96 overflow-hidden">
                <Image src={onlineLearning} alt="onlineLearning" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white" id="why">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <SectionTitle centered>Pourquoi MindBridge Space ?</SectionTitle>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Un seul espace. Trois univers connectés.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={fadeIn}>
                <Card title="Écoles">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Gestion complète, cours en ligne</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Suivi académique & comportemental</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Espace thérapeutique intégré</span>
                    </li>
                  </ul>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card title="Formations modulaires">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Flexibilité des formats et contenus</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Accès rapide aux modules</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Parcours personnalisés pour chaque apprenant</span>
                    </li>
                  </ul>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card title="Santé et bien-être">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Consultations en ligne sécurisées</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Dossiers clients organisés</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={18}
                        className="text-[#C14524] mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Ressources et accompagnement personnalisé</span>
                    </li>
                  </ul>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
