"use client";
import { useState } from "react";
import LoginPage from "./AuthentificationPages/LoginPage";
import RegisterPage from "./AuthentificationPages/RegisterPage";
import SelectUserTypePage from "./AuthentificationPages/SelectUserTypePage";

const AuthPages = () => {
  const [currentPage, setCurrentPage] = useState("selectType");
  const [userType, setUserType] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    organizationName: "",
    phone: "",
  });

  const handleSelectType = (type) => {
    setUserType(type);
    setCurrentPage("register");
  };

  const handleGoToLogin = () => {
    setCurrentPage("login");
  };

  const handleGoToRegister = () => {
    setCurrentPage("selectType");
  };

  const handleGoBack = () => {
    setCurrentPage("selectType");
  };

  // Gestion de la connexion (API Symfony)
  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Connexion réussie:", data);
        // Stocker le token si nécessaire
        if (data.token) {
          localStorage.setItem("auth_token", data.token);
        }

        // Redirection selon le type d'utilisateur
        // window.location.href = `/dashboard/${data.userType}`;
      } else {
        // Gestion des erreurs
        console.error("Erreur de connexion:", data.message);
        alert(data.message || "Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      alert("Erreur de connexion au serveur");
    }
  };

  // Gestion de l'inscription (API Symfony)
  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    // Validation des champs obligatoires
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.organizationName
    ) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userType: userType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Inscription réussie:", data);
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");

        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          organizationName: "",
          phone: "",
        });

        // Rediriger vers la page de connexion
        setCurrentPage("login");
      } else {
        // Gestion des erreurs
        console.error("Erreur d'inscription:", data.message);
        alert(data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      alert("Erreur de connexion au serveur");
    }
  };

  // Rendu conditionnel avec navigation fluide
  switch (currentPage) {
    case "login":
      return (
        <LoginPage
          onGoToRegister={handleGoToRegister}
          formData={formData}
          setFormData={setFormData}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onLogin={handleLogin}
        />
      );

    case "register":
      return (
        <RegisterPage
          userType={userType}
          onGoBack={handleGoBack}
          onGoToLogin={handleGoToLogin}
          formData={formData}
          setFormData={setFormData}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          onRegister={handleRegister}
        />
      );

    default:
      return (
        <SelectUserTypePage
          onSelectType={handleSelectType}
          onGoToLogin={handleGoToLogin}
        />
      );
  }
};

export default AuthPages;
