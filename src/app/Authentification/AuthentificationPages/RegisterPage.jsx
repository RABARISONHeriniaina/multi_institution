"use client";
import registerSchoolImg from "@/src/assets/images/registerSchool.png";
import registerTrainingImg from "@/src/assets/images/registerTraining.png";
import registerWellnessImg from "@/src/assets/images/registerWellnessImg.png";
import AuthContainer from "@/src/components/layout/AuthContainer";
import InputField from "@/src/components/ui/InputField";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import { ArrowLeft, Heart, School, Users } from "lucide-react";
import Image from "next/image";
const RegisterPage = ({
  userType,
  onGoBack,
  onGoToLogin,
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  onRegister,
}) => {
  const userTypes = {
    school: {
      title: "École ou établissement",
      icon: School,
      color: "from-orange-500 to-orange-600",
    },
    training: {
      title: "Centre de Formation",
      icon: Users,
      color: "from-yellow-500 to-yellow-600",
    },
    wellness: {
      title: "Professionnel Bien-être",
      icon: Heart,
      color: "from-gray-500 to-gray-600",
    },
  };

  const selectedType = userTypes[userType];
  const IconComponent = selectedType?.icon;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getOrganizationLabel = () => {
    switch (userType) {
      case "school":
        return "Nom de l'école";
      case "training":
        return "Nom du centre";
      case "wellness":
        return "Nom de votre cabinet/pratique";
      default:
        return "Nom de l'organisation";
    }
  };

  const getUserTypeImage = () => {
    switch (userType) {
      case "school":
        return registerSchoolImg;
      case "training":
        return registerTrainingImg;
      case "wellness":
        return registerWellnessImg;
      default:
        return registerSchoolImg;
    }
  };

  return (
    <AuthContainer>
      <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="hidden md:flex md:w-1/2  items-center justify-center p-6">
          <Image
            src={getUserTypeImage()}
            alt="Illustration inscription"
            className="max-w-full h-auto object-contain"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <div className="flex items-center mb-6">
            <button
              onClick={onGoBack}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center">
              {IconComponent && (
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-r ${selectedType.color} flex items-center justify-center mr-3`}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Inscription
                </h1>
                <p className="text-sm text-gray-600">{selectedType?.title}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Prénom"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <InputField
                label="Nom"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <InputField
              label={getOrganizationLabel()}
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              required
            />

            <InputField
              label="Email professionnel"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <InputField
              label="Téléphone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />

            <InputField
              label="Mot de passe"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <InputField
              label="Confirmer le mot de passe"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              showPasswordToggle
              showPassword={showConfirmPassword}
              onTogglePassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            />

            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-1"
              />
              <span className="ml-2 text-sm text-gray-600">
                J'accepte les{" "}
                <a href="#" className="text-orange-600 hover:text-orange-700">
                  conditions d'utilisation
                </a>{" "}
                et la{" "}
                <a href="#" className="text-orange-600 hover:text-orange-700">
                  politique de confidentialité
                </a>
              </span>
            </div>

            <PrimaryButton onClick={onRegister}>Créer mon compte</PrimaryButton>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Déjà un compte ?{" "}
              <button
                onClick={onGoToLogin}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default RegisterPage;
