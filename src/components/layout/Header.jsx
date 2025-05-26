"use client";
import { motion } from "framer-motion";
import { ChevronDown, Menu, Search, User, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const menuRef = useRef(null);

  // Regroupement des éléments de navigation
  const navItems = [
    { id: "home", label: "Accueil", type: "link" },
    {
      id: "services",
      label: "Services",
      type: "dropdown",
      children: [
        { id: "who", label: "Pour qui ?" },
        { id: "features", label: "Fonctionnalités" },
        { id: "wellness", label: "Bien-être & Santé" },
      ],
    },
    {
      id: "education",
      label: "Éducation",
      type: "dropdown",
      children: [
        { id: "schools", label: "Écoles et Universités" },
        { id: "training", label: "Formations modulaires" },
      ],
    },
    { id: "pricing", label: "Tarifs", type: "link" },
    { id: "testimonials", label: "Témoignages", type: "link" },
    { id: "contact", label: "Contact", type: "link" },
  ];

  // Fermer les sous-menus quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Observer pour détecter la section active
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Déterminer si un item ou ses enfants sont actifs
  const isItemActive = (item) => {
    if (item.type === "link") {
      return activeTab === item.id;
    } else if (item.type === "dropdown") {
      return item.children.some((child) => activeTab === child.id);
    }
    return false;
  };

  // Basculer l'état du sous-menu
  const toggleSubmenu = (id) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-[#C14524]"
          >
            MindBridge<span className="text-[#D1A86A]">Space</span>
          </motion.div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6" ref={menuRef}>
          {navItems.map((item) => (
            <div key={item.id} className="relative">
              {item.type === "link" ? (
                <motion.a
                  whileHover={{ y: -2 }}
                  href={`#${item.id}`}
                  className={`cursor-pointer transition-colors ${
                    activeTab === item.id
                      ? "text-[#C14524] font-medium border-b-2 border-[#C14524]"
                      : "text-gray-600 hover:text-[#C14524]"
                  }`}
                >
                  {item.label}
                </motion.a>
              ) : (
                <div className="relative">
                  <motion.button
                    whileHover={{ y: -2 }}
                    onClick={() => toggleSubmenu(item.id)}
                    className={`flex items-center cursor-pointer transition-colors ${
                      isItemActive(item)
                        ? "text-[#C14524] font-medium"
                        : "text-gray-600 hover:text-[#C14524]"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`ml-1 transition-transform ${
                        openSubmenu === item.id ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  {openSubmenu === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 mt-1 py-2 w-48 bg-white shadow-lg rounded-md z-50"
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.id}
                          href={`#${child.id}`}
                          onClick={() => setOpenSubmenu(null)}
                          className={`block px-4 py-2 text-sm ${
                            activeTab === child.id
                              ? "text-[#C14524] font-medium bg-gray-50"
                              : "text-gray-600 hover:text-[#C14524] hover:bg-gray-50"
                          }`}
                        >
                          {child.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Ajout d'éléments complémentaires */}
          <button className="text-gray-600 hover:text-[#C14524] transition-colors">
            <Search size={20} />
          </button>
          <button className="text-gray-600 hover:text-[#C14524] transition-colors">
            <User size={20} />
          </button>
          <Link href="/Authentification">
            <button className="bg-[#C14524] text-white px-4 py-2 rounded-md hover:bg-[#a73a1e] transition-colors cursor-pointer">
              Démarrer
            </button>
          </Link>
        </nav>

        {/* Burger menu button */}
        <div className="md:hidden flex items-center space-x-4">
          <button className="text-gray-600 hover:text-[#C14524]">
            <Search size={20} />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white"
        >
          <div className="container mx-auto px-4 py-2">
            {navItems.map((item) => (
              <div key={item.id}>
                {item.type === "link" ? (
                  <div className="py-2 border-b border-gray-100">
                    <a
                      href={`#${item.id}`}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block transition-colors ${
                        activeTab === item.id
                          ? "text-[#C14524] font-medium"
                          : "text-gray-600 hover:text-[#C14524]"
                      }`}
                    >
                      {item.label}
                    </a>
                  </div>
                ) : (
                  <div className="border-b border-gray-100">
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className={`flex items-center justify-between w-full py-2 ${
                        isItemActive(item)
                          ? "text-[#C14524] font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          openSubmenu === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openSubmenu === item.id && (
                      <div className="bg-gray-50 pl-4">
                        {item.children.map((child) => (
                          <a
                            key={child.id}
                            href={`#${child.id}`}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block py-2 ${
                              activeTab === child.id
                                ? "text-[#C14524] font-medium"
                                : "text-gray-600 hover:text-[#C14524]"
                            }`}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex flex-col space-y-3 pb-4">
              <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center">
                <User size={16} className="mr-2" />
                Compte
              </button>
              <button className="bg-[#C14524] text-white px-4 py-2 rounded-md hover:bg-[#a73a1e] transition-colors cursor-pointer">
                Démarrer
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
