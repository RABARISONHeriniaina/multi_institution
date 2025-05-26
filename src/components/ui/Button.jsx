"use client";

import { motion } from "framer-motion";

const Button = ({
  primary = false,
  children,
  className = "",
  onClick = () => {},
  type = "button",
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`
        py-3 px-6 
        rounded-2xl 
        font-semibold 
        transition-all 
        duration-200
        shadow-md 
        ${fullWidth ? "w-full" : ""}
        ${
          primary
            ? "bg-[#C14524] text-white hover:bg-[#C14524]"
            : "border-2 border-[#D25B3B] text-[#D25B3B] bg-white hover:bg-[#fdf7ee]"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default Button;
