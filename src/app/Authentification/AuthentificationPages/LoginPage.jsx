"use client";

import AuthContainer from "@/src/components/layout/AuthContainer";
import InputField from "@/src/components/ui/InputField";
import PrimaryButton from "@/src/components/ui/PrimaryButton";

const LoginPage = ({
  onGoToRegister,
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  onLogin,
}) => {
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AuthContainer>
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h1>
            <p className="text-gray-600">
              Accédez à votre espace{" "}
              <span className="text-orange-600 font-semibold">MindBridge</span>
              <span className="text-[#D1A86A]">Space</span>
            </p>
          </div>

          <div className="space-y-6">
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="votre@email.com"
            />

            <InputField
              label="Mot de passe"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="••••••••"
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Se souvenir de moi
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                Mot de passe oublié ?
              </a>
            </div>

            <PrimaryButton onClick={onLogin}>Se connecter</PrimaryButton>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Pas encore de compte ?{" "}
              <button
                onClick={onGoToRegister}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Créer un compte
              </button>
            </p>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default LoginPage;
