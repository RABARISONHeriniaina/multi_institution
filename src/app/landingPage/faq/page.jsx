"use client";
import FAQ from "@/src/components/ui/FAQ";
import SectionTitle from "@/src/components/ui/SectionTitle";
import { motion } from "framer-motion";
export default function Faq() {
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
      <section className="py-16 bg-white" id="faq">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <SectionTitle centered>Questions fréquentes</SectionTitle>
            </motion.div>

            <motion.div variants={fadeIn} className="max-w-3xl mx-auto">
              <FAQ
                question="Puis-je utiliser la plateforme sans être une école ?"
                answer="Absolument ! MindBridge Space est conçu pour s'adapter à différents profils : écoles, centres de formation modulaire et professionnels de la santé et du bien-être. Vous pouvez choisir le profil qui correspond le mieux à votre activité."
              />
              <FAQ
                question="Comment ajouter mes propres thérapeutes ?"
                answer="Dans votre espace d'administration, vous disposez d'une section dédiée à la gestion des utilisateurs. C'est là que vous pouvez inviter vos thérapeutes en ajoutant leur adresse email. Ils recevront une invitation pour créer leur compte avec les droits appropriés."
              />
              <FAQ
                question="Est-ce que la visioconférence est sécurisée ?"
                answer="Oui, notre système de visioconférence intégré utilise un chiffrement de bout en bout pour garantir la confidentialité des échanges, particulièrement important pour les consultations thérapeutiques et les cours en ligne."
              />
              <FAQ
                question="Peut-on intégrer des paiements ?"
                answer="MindBridge Space s'intègre avec plusieurs solutions de paiement sécurisées pour permettre la facturation des cours, formations ou consultations directement via la plateforme."
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
