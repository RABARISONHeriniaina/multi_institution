"use client";
import SectionTitle from "@/src/components/ui/SectionTitle";
import Testimonial from "@/src/components/ui/Testimonial.";
import { motion } from "framer-motion";
const Temoignages = () => {
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
      <section className="py-16 bg-gray-50" id="testimonials">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <SectionTitle centered>Témoignages</SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={fadeIn}>
                <Testimonial
                  quote="Une plateforme complète pour notre école avec en plus une aide précieuse sur le bien-être."
                  author="Directrice"
                  role="École Lumière"
                />
              </motion.div>
              <motion.div variants={fadeIn}>
                <Testimonial
                  quote="J'ai pu lancer ma formation modulaire sans coder quoi que ce soit."
                  author="Formateur"
                  role="développement personnel"
                />
              </motion.div>
              <motion.div variants={fadeIn}>
                <Testimonial
                  quote="Je gère mes consultations et mon agenda thérapeutique sur MindBridge Space, c'est fluide et rassurant."
                  author="Coach"
                  role="en parentalité"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Temoignages;
