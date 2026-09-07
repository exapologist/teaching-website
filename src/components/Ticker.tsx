/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

const SUBFIELDS = [
  "logic", "ethics", "epistemology", "metaphysics", "political philosophy",
  "philosophy of science", "medical ethics", "feminist philosophy", "ancient philosophy",
  "modern philosophy", "philosophy of mind", "social philosophy", "aesthetics", "existentialism"
];

export default function Ticker() {
  // Duplicate for a seamless infinite loop
  const items = [...SUBFIELDS, ...SUBFIELDS];

  return (
    <div className="overflow-hidden border-y border-slate-800/80 py-3 bg-[#090d16] select-none relative shadow-inner">
      {/* Subtle glossy shines on sides of the ribbon */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#090d16] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#090d16] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-0"
        animate={{ x: [0, "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 36,
        }}
      >
        {items.map((sub, i) => (
          <span 
            key={i} 
            className="flex items-center text-slate-100/90 shrink-0 font-serif italic text-[15px] sm:text-base tracking-wide"
          >
            <span className="px-8 drop-shadow-sm">{sub}</span>
            <span className="text-blue-500/30 text-xs font-sans not-italic select-none">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
