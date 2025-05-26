"use client";
import Button from "@/src/components/ui/Button";
import Card from "@/src/components/ui/Card";
import SectionTitle from "@/src/components/ui/SectionTitle";
import { motion } from "framer-motion";
const Fonctionnalités = () => {
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
    <section className="py-16 bg-gray-50" id="features">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="text-center mb-12">
            <SectionTitle centered>Fonctionnalités Clés</SectionTitle>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Espace personnalisable",
                desc: "Logo, couleurs et modules adaptés à votre identité",
              },
              {
                title: "Cours & formations en ligne",
                desc: "Visioconférences intégrées et contenus interactifs",
              },
              {
                title: "Gestion des contenus",
                desc: "Organisation intuitive et évaluations automatisées",
              },
              {
                title: "Comptes distincts",
                desc: "Pour éducateurs, formateurs et thérapeutes",
              },
              {
                title: "Suivi complet",
                desc: "Élèves, clients, historique et reporting détaillé",
              },
              {
                title: "Communication directe",
                desc: "Messagerie, chat et notifications personnalisables",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card title={feature.title}>
                  <p>{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeIn} className="text-center mt-12">
            <Button primary>Voir toutes les fonctionnalités</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Fonctionnalités;
