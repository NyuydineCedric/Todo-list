import React from "react";
import { motion } from "framer-motion";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <motion.div
        className="loader-spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p>Loading TaskFlow...</p>
    </div>
  );
};

export default Loader;
