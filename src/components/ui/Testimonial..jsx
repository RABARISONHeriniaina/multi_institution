"use client";

import { motion } from "framer-motion";

const Testimonial = ({ quote, author, role, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-lg shadow-md border-l-4 border-secondary"
    >
      {image && (
        <div className="mb-4 flex justify-center">
          <img
            src={image}
            alt={author}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
      )}
      <p className="italic text-gray-600 mb-4">« {quote} »</p>
      <div className="font-semibold text-gray-800">
        {author}
        {role && <span className="font-normal text-gray-500"> – {role}</span>}
      </div>
    </motion.div>
  );
};

export default Testimonial;
