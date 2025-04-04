import { animate, useMotionValue, useTransform } from "framer-motion";

// Navbar Animations
export const navVariants = {
  visible: { y: 0, transition: { duration: 0.35, ease: "easeInOut" } },
  hidden: { y: "-100%", transition: { duration: 0.35, ease: "easeInOut" } },
};

export const menuVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  closed: {
    y: "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export const accountDropdownVariants = {
  open: { opacity: 1, y: 0, display: "block", transition: { duration: 0.3 } },
  closed: {
    opacity: 0,
    y: -10,
    transitionEnd: { display: "none" },
    transition: { duration: 0.3 },
  },
};

// Hero Animations
export const slideRight = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visitable: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      delay: 1,
    },
  },
};

export const heroButtonAnimation = {
  hidden: {
    y: -50,
    opacity: 0,
  },
  visitable: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 2,
    },
  },
};

export const heroIconBounceAnimation = {
  hidden: { x: 5 },
  visitable: {
    x: 10,
    transition: {
      repeat: Infinity,
      ease: "easeInOut",
      duration: 1,
      repeatType: "mirror" as "mirror",
    },
  },
};

export const circleAnimations = {
  backCircle: {
    initial: {
      x: -55,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    transition: {
      delay: 2.5,
      duration: 0.3,
      ease: "easeInOut",
    },
  },

  middleCircle: {
    initial: {
      x: -145,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    transition: {
      delay: 3.5,
      duration: 0.3,
      ease: "easeInOut",
    },
  },

  frontCircle: {
    initial: {
      x: -95,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    transition: {
      delay: 4.5,
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// BookCollection Animation
export const titleVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export const dividerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, delay: 0.5, ease: "easeInOut" },
  },
};

export const textVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.5, ease: "easeInOut" },
  },
};

export const imageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, delay: 1, ease: "easeInOut" },
  },
};

// WhyChooseUs Animation
export const staggerContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.6,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

export const availabilityVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, delay: 2, ease: "easeInOut" },
  },
};

// HowItWorks Animation
export const circleVariants = {
  hidden: { backgroundColor: "#d6d6d6", borderColor: "#d6d6d6" },
  visible: (index: number) => ({
    backgroundColor: "#F97316",
    borderColor: "#F97316",
    transition: { delay: index * 0.1 },
  }),
};

// AboutUs Animation
export const useCounter = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  const startAnimation = () => {
    const animation = animate(count, 2940, { duration: 5 });
    return () => animation.stop();
  };

  return { rounded, startAnimation };
};
