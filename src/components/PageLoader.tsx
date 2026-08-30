"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.sessionStorage.getItem("gsm-loaded")) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem("gsm-loaded", "1");
      setVisible(false);
    }, 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center text-white"
          >
            <motion.div
              className="mx-auto mb-4"
              animate={{ rotate: [0, 8, -8, 0], y: [0, -6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <BrandLogo size={72} priority className="mx-auto shadow-lg shadow-violet-500/40" />
            </motion.div>
            <p className="text-sm tracking-[0.25em] text-accent">SIDI MOUMEN</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
