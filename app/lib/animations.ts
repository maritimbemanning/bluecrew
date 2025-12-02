/**
 * BLUECREW ANIMATION PRESETS
 * Reusable Framer Motion variants for consistent animations
 */

import { Variants } from "framer-motion";

// Fade in from bottom (most common)
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Fade in from right
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Scale up (for cards, buttons)
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Stagger children (for lists, grids)
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger item (use with staggerContainer)
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Hero text reveal (letter by letter effect)
export const heroTextReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Blur in (premium feel)
export const blurIn: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Float animation (for decorative elements)
export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Pulse glow (for CTAs)
export const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(56, 189, 248, 0.3)",
      "0 0 40px rgba(56, 189, 248, 0.5)",
      "0 0 20px rgba(56, 189, 248, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

// Button hover
export const buttonHover = {
  scale: 1.02,
  y: -2,
  transition: {
    duration: 0.2,
    ease: [0.16, 1, 0.3, 1] as const,
  },
};

export const buttonTap = {
  scale: 0.98,
};

// Card hover
export const cardHover = {
  y: -8,
  transition: {
    duration: 0.3,
    ease: [0.16, 1, 0.3, 1] as const,
  },
};

// Page transition
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// Viewport settings for scroll animations
export const viewportOnce = {
  once: true,
  margin: "-100px",
};

export const viewportRepeat = {
  once: false,
  margin: "-50px",
};
