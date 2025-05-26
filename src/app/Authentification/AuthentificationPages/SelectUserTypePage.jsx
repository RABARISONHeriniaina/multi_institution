"use client";
import AuthContainer from "@/src/components/layout/AuthContainer";
import UserTypeCard from "@/src/components/ui/UserTypeCard ";
import { motion } from "framer-motion";
import { Heart, School, Users } from "lucide-react";
const SelectUserTypePage = ({ onSelectType, onGoToLogin }) => {
  const userTypes = [
    {
      id: "school",
      title: "École ou Établissement",
      description:
        "Gestion complète, cours en ligne, suivi académique & comportemental",
      icon: School,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "training",
      title: "Centre de Formation",
      description: "Formations modulaires, parcours personnalisés, certificats",
      icon: Users,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: "wellness",
      title: "Professionnel Bien-être",
      description:
        "Consultations, dossiers clients, accompagnement thérapeutique",
      icon: Heart,
      color: "from-gray-500 to-gray-600",
    },
  ];

  return (
    <AuthContainer>
      <div className="max-w-4xl w-full">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Rejoignez <span className="text-orange-600">MindBridge Space</span>
          </h1>
          <p className="text-xl text-gray-600">
            Choisissez votre profil pour commencer
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {userTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
            >
              <UserTypeCard type={type} onSelect={onSelectType} />
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-gray-600 mb-4">Vous avez déjà un compte ?</p>
          <button
            onClick={onGoToLogin}
            className="text-orange-600 hover:text-orange-700 font-semibold underline cursor-pointer"
          >
            Se connecter
          </button>
        </motion.div>
      </div>
    </AuthContainer>
  );
};

export default SelectUserTypePage;
