import React from "react";
import { motion } from "framer-motion";
import "./Card.css";

const Card = ({ children, className, hoverable = true, onClick }) => {
  return (
    <motion.div
      className={`card ${hoverable ? "card-hoverable" : ""} ${className || ""}`}
      whileHover={hoverable ? { y: -4, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;
