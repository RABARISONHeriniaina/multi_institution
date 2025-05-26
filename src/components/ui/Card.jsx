"use client";

import { motion } from "framer-motion";

const Card = ({ title, children, icon, className = "", hover = true }) => {
  const CardComponent = hover ? motion.div : "div";
  const hoverProps = hover ? { whileHover: { y: -5 } } : {};

  return (
    <CardComponent
      {...hoverProps}
      className={`bg-white p-6 rounded-lg shadow-lg ${className}`}
    >
      {icon && <div className="text-primary mb-4">{icon}</div>}
      {title && (
        <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      )}
      <div className="text-gray-600">{children}</div>
    </CardComponent>
  );
};

export default Card;
